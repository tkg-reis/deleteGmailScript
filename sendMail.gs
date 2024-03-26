const sendMail = (deleteMailLists) => {
  let to = PropertiesService.getScriptProperties().getProperty("myMailAdress");
  let title = "三日分の削除対象メールです。";
  let body = [];
  deleteMailLists.forEach((list,i) => {
    body.push(list);
    body.push("\n");
  })

  GmailApp.sendEmail(to, title, body);
}
