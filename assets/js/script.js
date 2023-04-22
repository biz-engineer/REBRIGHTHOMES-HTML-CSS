

//ハンバーガーメニュー
// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
  const scrollingElement = () => {
    const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) return document.scrollingElement;
    return document.documentElement;
  };

  const scrollY = bool
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");

  const fixedStyles = {
    height: "100vh",
    position: "fixed",
    top: `${scrollY * -1}px`,
    left: "0",
    width: "100vw"
  };

  Object.keys(fixedStyles).forEach((key) => {
    document.body.style[key] = bool ? fixedStyles[key] : "";
  });

  if (!bool) {
    window.scrollTo(0, scrollY * -1);
  }
};

// 変数定義
const CLASS = "-active";
let flg = false;
let accordionFlg = false;

let humberger = document.getElementById("js-humberger");
let focusTrap = document.getElementById("js-focus-trap");
let menu = document.querySelector(".js-nav-area");
let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
let accordion = document.querySelectorAll(".js-sp-accordion");

// メニュー開閉制御
humberger.addEventListener("click", (e) => { //ハンバーガーボタンが選択されたら
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {// flgの状態で制御内容を切り替え
    // backgroundFix(false);//後で実装
    humberger.setAttribute("aria-expanded", "false");
    humberger.focus();
    flg = false;
  } else {
    // backgroundFix(true);
    humberger.setAttribute("aria-expanded", "true");
    flg = true;
  }
});
window.addEventListener("keydown", () => {　//escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    humberger.classList.remove(CLASS);
    menu.classList.remove(CLASS);

    backgroundFix(false);
    humberger.focus();
    humberger.setAttribute("aria-expanded", "false");
    flg = false;
  }
});

// メニュー内アコーディオン制御
accordionTrigger.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (accordionFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      accordionFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      accordionFlg = true;
    }
  });

});

// フォーカストラップ制御
focusTrap.addEventListener("focus", (e) => {
  humberger.focus();
});


//TOPに戻るボタン
//画面にフッターが現れたらTOPに戻るボタンをフッターの上に配置
window.addEventListener('scroll', function () {
  //トップへ戻るボタンを取得
  let topBtn = document.querySelector('#js-topmigration-button');

  //画面上部からトップビジュアル下の位置取得
  const topVisual = document.querySelector('#js-top-visual').getBoundingClientRect().bottom;

  //トップビジュアル下の位置より下にスクロールされたらactiveクラウを付与
  if (topVisual <= 0) {
    topBtn.classList.add('active');
  } else {
    //スクロールが200px未満のときactiveクラスを外す
    topBtn.classList.remove('active');
  }
  // 追記
  //ドキュメントの高さ
  const scrollHeight = document.body.clientHeight;

  //スクロール位置
  const scrollPosition = window.pageYOffset;

  //windowの高さ
  const windowHeignt = window.innerHeight;

  //footer取得
  const footer = document.querySelector('#footer');

  //footerの高さ
  const footerHeight = footer.offsetHeight;
  if (scrollHeight - scrollPosition - windowHeignt <= footerHeight) {
    topBtn.classList.add('stop');
  } else {
    topBtn.classList.remove('stop');
  }
});