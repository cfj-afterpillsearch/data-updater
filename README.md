# data-updater
このリポジトリは、https://afterpill.jp で提供している医療機関や薬局の情報を更新するためのスクリプトを格納しています。

## データ更新概要

### 医療機関

WIP

### 薬局

WIP

## 使い方
### リポジトリをクローンしたら
```shell
npm install
```
.envファイルをプロジェクトメンバーから入手し、プロジェクトルートに配置してください。


### 各スクリプトのローカル実行

```shell
npm run debug:watch -function_name=<function_name>
```

`function_name`には、`src/main.ts`にあるfunction-frameworkに指定した関数名を入力してください。

```shell
# 例
npm run debug:watch -function_name=ph_scraping
```

詳細は各スクリプトのディレクトリにあるREADME.mdを参照してください。

| 種類   | 関数名               | READMEのパス                                      |
|------|-------------------|------------------------------------------------|
| 薬局   | ph_scraping       | [README.md](./src/pharmacy/scraping/README.md) |
| 薬局   | ph_normalize      | WIP                                            |
| 薬局   | ph_update_address | WIP                                            |
| 薬局   | ph_add_geo        | WIP                                            |
| 医療機関 | mi_scraping       | WIP                                            |
| 医療機関 | mi_normalize      | WIP                                            |
| 医療機関 | mi_update_address | WIP                                            |
| 医療機関 | mi_add_geo        | WIP                                            |


### デプロイ

WIP
