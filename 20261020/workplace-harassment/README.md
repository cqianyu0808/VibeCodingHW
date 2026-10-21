# 安心職場｜RAG 作業繳交說明

繳交標題：**學號 系級 姓名 安心職場RAG對話機器人**

## 要交什麼

| 項目 | 準備內容 | 目前狀態 |
|---|---|---|
| 主要程式連結 | 下方 RAG02 Colab 連結 | 已準備，知道連結即可檢視 |
| 知識庫製作程式 | 下方 RAG01 Colab 連結，作為補充 | 已準備，知道連結即可檢視 |
| GitHub 程式與資料 | 本資料夾的兩份 ipynb、教材 ZIP、向量庫 ZIP | 公開儲存庫，無須登入即可讀取 |
| 資料說明 | 職場性騷擾教材內容與來源 | 已寫在兩份 Colab 開頭 |
| 人設／背景與 Prompt | 安心職場：耐心、尊重隱私的文件導讀助理 | 已寫在 RAG02 開頭與 SYSTEM_PROMPT |
| 重點截圖 | 新版執行結果、Prompt、Gradio 問題及回答 | 尚待新版執行後截圖，不使用已刪除的上一版畫面 |
| Gradio 對話結果 | 問題與實際回答，可用截圖呈現 | 尚待新版執行後取得 |

課程要求的主要繳交網址是 **第二份 Colab**。GitHub 用來公開保存程式及提供 ZIP 下載，不取代主要 Colab 連結。這份 RAG 作業不需要另外建立 GitHub Pages 網站。

## 連結

- [RAG02：主要繳交 Colab](https://colab.research.google.com/drive/1OzAI8mCWbl-qlT55XuDZ1JVUzkDPP0AT?usp=sharing)
- [RAG01：建立知識庫](https://colab.research.google.com/drive/1mVFRnyYc2fRZRLB8Qx69rQ2EqhI0ZZoK?usp=sharing)
- [GitHub 程式與教材](https://github.com/cqianyu0808/VibeCodingHW/tree/main/20261020/workplace-harassment)
- [原始教材 source-data.zip](https://raw.githubusercontent.com/cqianyu0808/VibeCodingHW/main/20261020/workplace-harassment/source-data.zip)
- [向量知識庫 rag-data.zip](https://raw.githubusercontent.com/cqianyu0808/VibeCodingHW/main/20261020/workplace-harassment/rag-data.zip)

## 你接下來怎麼做

1. 開啟 RAG02，重新整理，確定是新版。依老師原本方式，由上往下一格一格執行。
2. 確認 Colab 左側 Secrets 中名稱 `Groq` 的金鑰已開啟這份筆記本的存取權。助教另行執行時，須使用自己的金鑰；共用筆記本不會自動共用你的 Secret。
3. RAG02 已有 ZIP 網址，會自動下載向量庫。等模型載入後，執行「啟動展示」。
4. Gradio 啟動後，先不要執行最後的「停止服務」儲存格。使用這次產生的新 Gradio 連結，不使用上一版開著的網址。
5. 輸入下方問題，等回答完成，再截圖。核對回答是否受到文件支持，不把模型回答直接當作法律結論。
6. 儲存 Colab，將主要連結、資料／人設說明及新截圖交到課程平台。GitHub 連結可一併附上。

若需要重新製作知識庫：執行 RAG01，依上傳視窗選擇本資料夾的 `source-data.zip`，完成後下載 `rag-data.zip`。目前已有建好的向量庫，日常展示可直接執行 RAG02。

## 要打什麼問題、截什麼圖

| 截圖 | 建議畫面 |
|---|---|
| 1. 資料與人設 | RAG02 開頭的主題、來源及人設說明，加上 SYSTEM_PROMPT 主要內容 |
| 2. 知識庫載入 | 已讀取四個檔案、文件數 8、向量維度 768 的實際輸出 |
| 3. Gradio 對話 | 問：`遭受公司最高負責人性騷擾，可以直接向地方主管機關申訴嗎？`，截問題、回答及文件編號 |
| 4. 另一題對話 | 問：`公司收到性騷擾申訴後，應如何保護申訴人，以及多久要結案？`，截回答和來源表 |

若一張放不下，可以分成「問題與回答」及「檢索來源」兩張。不要截到金鑰值。新版截圖完成前，不能把作業標示成全部驗收完成。

## 可以貼到繳交區的文字

> 主題：安心職場——職場性騷擾 RAG 對話機器人。知識庫使用 8 份整理自勞動部法規及官方問答的教學摘要，範圍包括定義、雇主責任、申訴管道與期限、調查保護及結案。每份文件保留官方來源網址與整理日期。人設是耐心、尊重隱私的繁體中文文件導讀助理，只依檢索文件回答，資料不足時明確說明。程式沿用老師的 EmbeddingGemma 2、FAISS、AIsuite 與 Gradio。RAG02 已加入可直接下載向量庫的網址。

在上面文字後貼上 RAG02 連結、GitHub 連結，並附你剛執行取得的新截圖。不要宣稱尚未完成的測試已通過。

## 權限

GitHub 儲存庫為 Public。兩份 Colab 均為「知道連結的任何人：檢視者」。這足以讓助教查看、複製及使用自己的執行環境重現；不必開放陌生人編輯。Gradio 分享網址是臨時的，不能當成永久繳交網址。
