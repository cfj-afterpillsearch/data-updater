# Pharmacy Scraping
薬局リストのスクレイピングを行う関数です。
定期実行されるPub/Subトリガーを受け取り、スクレイピングを行います。

## ローカルでの実行方法
下記のコマンドを実行すると、http://localhost:8080 で関数が起動します。

```
npm run debug:watch -function_name=ph_scraping
```


下記のようにcurlコマンドでリクエストを送信すると、関数が実行されます。

```
curl localhost:8080 \
  -X POST \
  -H "Content-Type: application/json" \
  -H "ce-id: 123451234512345" \
  -H "ce-specversion: 1.0" \
  -H "ce-time: 2020-01-02T12:34:56.789Z" \
  -H "ce-type: google.cloud.pubsub.topic.v1.messagePublished" \
  -H "ce-source: //pubsub.googleapis.com/projects/MY-PROJECT/topics/MY-TOPIC" \
  -d '{
        "message": {
          "data": "d29ybGQ=",
          "attributes": {
             "attr1":"attr1-value"
          }
        },
        "subscription": "projects/MY-PROJECT/subscriptions/MY-SUB"
      }'
    
```
参考: https://cloud.google.com/functions/docs/running/calling?hl=ja#cloudevent-function-curl-tabs-pubsub

