## lambda-logging

`lambda-logging` make it easy to post errors on single page application to DynamoDB using AWS Lambda and API Gateway from client.


## Example

Invoke `start` when the application are loaded.

```JavaScript
import lambdaLogging from 'lambda-logging';
lambdaLogging.start(API_GATEWAY_ENDOPINT, DYNAMODB_TABEL_NAME);
```
