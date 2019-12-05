var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '906623',
  key: '202380678230df0b4d46',
  secret: '641b44a103ba725ce767',
  cluster: 'ap1',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});