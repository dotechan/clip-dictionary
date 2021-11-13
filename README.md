# clip-dictionary

## 現状の課題
- パスワードの管理をOneNoteのページで行っているがOneNoteを開くのが時間がかかって面倒
- スマホから対象のテキストを選択してコピーする操作が手間

## プロダクトの4階層

### Core
- スマホでパスワードの管理を楽にする

### Why
- Android端末のユーザーである自身がパスワードの管理が楽になり久々に訪れたサイトで毎回パスワードを再発行するような事態が起こらないようにする

### What
- サイトに対するパスワードがすぐにわかる
- セキュア

### How
- 辞書、アドレス帳のようなイメージでパスワードを管理する
- 認証によりセキュアにする
- ネイティブアプリで同期の必要がなく高速に確認できる

## メモ
ClipboardMangerのAPI経由でコピペしたテキストを取得できてしまうのでパスワードのようなセンシティブな情報をコピペできるようにするのはNG
https://www.jssec.org/dl/android_securecoding/6_difficult_problems.html#%E9%9B%A3%E3%81%97%E3%81%84%E5%95%8F%E9%A1%8C

### 生体認証
https://docs.expo.dev/versions/v43.0.0/sdk/local-authentication/

### クリップボード
https://docs.expo.dev/versions/v43.0.0/sdk/clipboard/
