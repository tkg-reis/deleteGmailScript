function searchTargetGmail() {
  
  // 検索演算子一覧
  // https://support.google.com/mail/answer/7190?hl=ja

  const development = "promotions";
  const production = "primary";

  const query = `is:unread newer_than:3d category:${development}`;
  const start = 0;
  const dev_maxRange = 5;
  const prod_maxRange = 30;
  const threads = GmailApp.search(query, start, dev_maxRange);
  const deleteMailLists = [];

  // メール内容確認用　ここの中にはプロモーションも含まれるみたい => category.primaryで指定可能
  // 消したメールの送信元と件名をメールで再度確認するためだけの処理
  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const mailFromName = message.getFrom();
      const mailSubjectValue = message.getSubject();
      deleteMailLists.push(`${mailFromName}: ${mailSubjectValue}`);
    });
  });

  // gas ではexport import は使えない。というか同じファイルのスコープ扱い。
  sendMail(deleteMailLists);
  
  // 複数の関数を一つにまとめて定期実行トリガーに登録する
  GmailApp.moveThreadsToTrash(threads);
}
