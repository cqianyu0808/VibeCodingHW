"use strict";
function calculateRate(attemptsText, madeText) {
  if (String(attemptsText).trim() === "" || String(madeText).trim() === "") return { error: "請完整填寫出手次數與命中次數。" };
  const attempts = Number(attemptsText), made = Number(madeText);
  if (!Number.isSafeInteger(attempts) || !Number.isSafeInteger(made)) return { error: "次數請填寫有效的整數，不可使用小數。" };
  if (attempts <= 0) return { error: "出手次數必須大於零。" };
  if (made < 0 || made > attempts) return { error: "命中次數必須介於零與出手次數之間。" };
  return { attempts, made, rate: (made / attempts * 100).toFixed(1) };
}
const form = document.getElementById("rate-form");
if (form) {
  const attempts = document.getElementById("attempts");
  const made = document.getElementById("made");
  const result = document.getElementById("rate-result");
  function clearResult() {
    result.classList.remove("error");
    result.textContent = "填入今天的投籃紀錄，看看本次命中率。";
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = calculateRate(attempts.value, made.value);
    result.classList.toggle("error", Boolean(data.error));
    result.replaceChildren();
    if (data.error) { result.textContent = data.error; return; }
    const percentage = document.createElement("strong");
    percentage.textContent = data.rate + "%";
    result.append(percentage, document.createTextNode("出手 " + data.attempts + " 次，命中 " + data.made + " 次。記下這次表現，下次在相近條件下比較。"));
  });
  form.addEventListener("input", clearResult);
  form.addEventListener("reset", clearResult);
}

