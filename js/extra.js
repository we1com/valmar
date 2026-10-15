/* Тема (светлая/тёмная) и язык (RU / KZ / EN) */
(function(){
var root=document.documentElement;
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}}

/* ---------- ТЕМА ---------- */
document.querySelectorAll(".th").forEach(function(b){
  b.onclick=function(){var t=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=t;ls("vm-theme",t)}
});

/* ---------- ЯЗЫК ---------- */
/* [рус, қаз, eng] — точное совпадение текстового узла */
var E=[
["Курсы обучения","Оқу курстары","Courses"],["Вебинары","Вебинарлар","Webinars"],["Видео-уроки","Бейне сабақтар","Video lessons"],
["Блог","Блог","Blog"],["О нас","Біз туралы","About us"],["Прайс","Прайс","Prices"],["Расписание","Кесте","Schedule"],
["Акции","Акциялар","Offers"],["Магазин","Дүкен","Shop"],
["Учебный центр эстетической косметологии","Эстетикалық косметология оқу орталығы","Aesthetic cosmetology training center"],
["ведущий учебный центр эстетической косметологии","жетекші эстетикалық косметология оқу орталығы","the leading aesthetic cosmetology training center"],
["Бесплатный вебинар","Тегін вебинар","Free webinar"],["Профессия","Мамандық","Profession"],["косметолог","косметолог","cosmetologist"],
["Приглашаем на бесплатный вебинар для профессиональных косметологов и интересующихся этой профессией","Кәсіби косметологтарды және осы мамандыққа қызығушылық танытқандарды тегін вебинарға шақырамыз","Join our free webinar for professional cosmetologists and anyone interested in the profession"],
["Зарегистрироваться","Тіркелу","Register"],["Узнать подробнее","Толығырақ білу","Learn more"],["Подробнее","Толығырақ","Read more"],
["Сертификатов","Сертификат","Certificates"],["мы выдали","біз бердік","issued"],["Моделей","Модель","Models"],["в нашей базе","біздің базада","in our database"],
["Специалистов","Маман","Specialists"],["мы обучили","біз оқыттық","trained"],["Довольных","Риза","Happy"],["клиентов","клиент","clients"],
["О нас","Біз туралы","About us"],["Мастер-классы","Мастер-класстар","Master classes"],["Почему мы","Неге біз","Why us"],
["Преподаватели","Оқытушылар","Teachers"],["Сертификаты","Сертификаттар","Certificates"],["Повышение квалификации","Біліктілікті арттыру","Professional development"],
["Специальные предложения","Арнайы ұсыныстар","Special offers"],["Закажите обратный звонок","Кері қоңырауға тапсырыс беріңіз","Request a call back"],
["Оставьте заявку в форме и наш менеджер свяжется с вами","Форманы толтырыңыз, менеджеріміз сізбен хабарласады","Leave a request and our manager will contact you"],
["Отправить","Жіберу","Send"],["Спасибо! Мы свяжемся с вами в ближайшее время.","Рахмет! Жақын арада сізбен хабарласамыз.","Thank you! We will contact you shortly."],
["Все направления","Барлық бағыттар","All categories"],["Курсы по косметологии","Косметология курстары","Cosmetology courses"],
["Эстетическая косметология","Эстетикалық косметология","Aesthetic cosmetology"],["Инъекционная косметология","Инъекциялық косметология","Injection cosmetology"],
["Лазерная косметология","Лазерлік косметология","Laser cosmetology"],["Онлайн обучение","Онлайн оқыту","Online training"],
["Стать моделью","Модель болу","Become a model"],["Ведем набор моделей","Модельдер жинап жатырмыз","We are recruiting models"],
["Программа курса","Курс бағдарламасы","Course program"],["Тренер","Жаттықтырушы","Trainer"],["Ранняя регистрация","Ерте тіркеу","Early registration"],
["Другие курсы","Басқа курстар","Other courses"],["Смотреть все курсы","Барлық курстарды көру","View all courses"],["Купить","Сатып алу","Buy"],
["Смотреть трейлер","Трейлерді көру","Watch trailer"],["Видео-урок","Бейне сабақ","Video lesson"],["Другие видео-уроки","Басқа бейне сабақтар","More video lessons"],
["Чему вы научитесь на курсе","Курста нені үйренесіз","What you will learn"],["Как это было в прошлый раз","Өткен жолы қалай болды","How it went last time"],
["Обучение косметологов","Косметологтарды оқыту","Cosmetologist training"],["Курсы","Курстар","Courses"],["косметологии","косметология","cosmetology"],
["Перейти в Instagram","Instagram-ға өту","Go to Instagram"],["Ботулинотерапия","Ботулинотерапия","Botulinum therapy"],["для косметологов","косметологтарға арналған","for cosmetologists"]
];
/* частичная замена (префиксы) */
var P=[["Стоимость:","Құны:","Price:"],["Спикер:","Спикер:","Speaker:"],["Тренер:","Жаттықтырушы:","Trainer:"],["Старт курса:","Курс басталуы:","Course starts:"],["Тема:","Тақырып:","Topic:"]];
var IDX={ru:0,kz:1,en:2},ATTR={ru:"ru",kz:"kk",en:"en"},cur="ru";
var M={};E.forEach(function(r){M[r[0]]=r})

function tr(node,lang){
  if(node._o===undefined)node._o=node.nodeValue;
  var o=node._o,t=o.trim(),r;
  if(lang==="ru"){r=o}
  else if(M[t]){r=o.replace(t,M[t][IDX[lang]])}
  else{r=o;P.forEach(function(p){if(r.indexOf(p[0])>-1)r=r.split(p[0]).join(p[IDX[lang]])})}
  if(node.nodeValue!==r)node.nodeValue=r;
}
function walk(lang){
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    var p=n.parentNode&&n.parentNode.nodeName;return(p==="SCRIPT"||p==="STYLE"||!n.nodeValue.trim()||(n.parentNode.closest&&n.parentNode.closest(".lang")))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  var n;while((n=w.nextNode()))tr(n,lang);
}
var busy=false,timer;
function setLang(lang){
  cur=lang;ls("vm-lang",lang);root.lang=ATTR[lang];
  busy=true;walk(lang);busy=false;
  document.querySelectorAll(".lang").forEach(function(l){
    var b=l.querySelector("button"),f=b.querySelector(".fl");
    if(f)f.className="fl"+(lang==="ru"?"":" "+lang);
    b.lastChild.textContent=" "+lang.toUpperCase()+" ⌄";
  });
}
/* контент, который рисует main.js позже (календарь, расписание) */
new MutationObserver(function(){
  if(busy||cur==="ru")return;clearTimeout(timer);
  timer=setTimeout(function(){busy=true;walk(cur);busy=false},60);
}).observe(document.body,{childList:true,subtree:true,characterData:true});

document.addEventListener("click",function(e){
  var li=e.target.closest&&e.target.closest(".lang li");
  if(li){var k=li.textContent.trim().toLowerCase();if(IDX[k]!==undefined)setLang(k)}
});
var saved=ls("vm-lang");if(saved&&IDX[saved]!==undefined&&saved!=="ru")setLang(saved);
})();
