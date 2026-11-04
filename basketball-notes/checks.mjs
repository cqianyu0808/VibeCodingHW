import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
const root = path.dirname(fileURLToPath(import.meta.url));
let count = 0;
function check(name, action) { action(); console.log("PASS " + name); count++; }
const pages = ["index.html", ...fs.readdirSync(path.join(root,"notes")).filter(x=>x.endsWith(".html")).map(x=>"notes/"+x)];
for (const page of pages) {
  const content = fs.readFileSync(path.join(root,page),"utf8");
  check(page+" 完整頁面與相對連結",()=>{
    assert.match(content, /lang="zh-Hant"/);
    assert.match(content, /name="viewport"/);
    assert.match(content, /<main id="main"/);
    assert.match(content, /<\/html>/);
    assert(!content.includes("{{"), "頁面仍有未替換欄位");
    for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const target = match[1];
      if (/^(?:https?:|mailto:)/.test(target)) continue;
      assert(!target.startsWith("/"),"不得使用根目錄路徑");
      const [file,anchor] = target.split("#");
      const dest = file ? path.resolve(root,path.dirname(page),decodeURIComponent(file)) : path.resolve(root,page);
      assert(fs.existsSync(dest), "連結不存在："+target);
      if (anchor) assert(fs.readFileSync(dest,"utf8").includes('id="'+anchor+'"'),"錨點不存在："+target);
    }
  });
  if (page.startsWith("notes/")) check(page+" 固定四個章節",()=>{
    const labels = [...content.matchAll(/<h2>(.*?)<\/h2>/g)].map(x=>x[1]);
    assert.deepEqual(labels,["練習目標","練習方法","注意事項","練習紀錄"]);
    assert.match(content, /<ol>/);
  });
}
function element() {
  const e={ value:"", textContent:"", children:[], listeners:{}, classes:new Set(),
    addEventListener(type,fn){this.listeners[type]=fn;},
    replaceChildren(){this.children=[];this.textContent="";},
    append(...items){this.children.push(...items);}
  };
  e.classList={remove(c){e.classes.delete(c);},toggle(c,enabled){enabled?e.classes.add(c):e.classes.delete(c);}};
  return e;
}
const elements=Object.fromEntries(["rate-form","attempts","made","rate-result"].map(x=>[x,element()]));
const doc={getElementById:id=>elements[id],createElement:()=>element(),createTextNode:t=>({textContent:t})};
const context=vm.createContext({document:doc});
vm.runInContext(fs.readFileSync(path.join(root,"assets/app.js"),"utf8"),context);
const submit=()=>elements["rate-form"].listeners.submit({preventDefault(){}});
for(const [attempts,made,expected] of [["20","8","40.0"],["20","0","0.0"],["20","20","100.0"],["3","1","33.3"]]){
 check(attempts+"投"+made+"中＝"+expected+"%",()=>{
   elements.attempts.value=attempts;elements.made.value=made;submit();
   assert.equal(elements["rate-result"].children[0].textContent,expected+"%");
   assert(!elements["rate-result"].classes.has("error"));
 });
}
for(const [a,m] of [["","8"],["20",""],[" ","0"],["0","0"],["-1","0"],["20","-1"],["20","21"],["2.5","1"],["20","1.5"],["Infinity","0"],["NaN","0"],["9007199254740992","1"]]){
 check("拒絕無效輸入 "+JSON.stringify([a,m]),()=>{
  elements.attempts.value=a;elements.made.value=m;submit();
  assert(elements["rate-result"].classes.has("error"));
  assert(elements["rate-result"].textContent.length>0);
  assert.equal(elements["rate-result"].children.length,0);
 });
}
for (const type of ["input","reset"]) check(type+" 清除舊結果及錯誤",()=>{
 elements.attempts.value="20";elements.made.value="8";submit();
 elements["rate-form"].listeners[type]();
 assert(!elements["rate-result"].classes.has("error"));
 assert.equal(elements["rate-result"].textContent,"填入今天的投籃紀錄，看看本次命中率。");
});
check("沒有表單的頁面可安全載入程式",()=>vm.runInNewContext(fs.readFileSync(path.join(root,"assets/app.js"),"utf8"),{document:{getElementById:()=>null}}));
console.log("完成："+count+" 項檢查通過。此檢查不取代瀏覽器視覺與鍵盤操作驗證。");

