let file, reader;

var el = document.getElementById('header_title');
var max = 14;
el.addEventListener('input', function(e) {
  if (el.innerHTML.length > max) {
    el.innerHTML = el.innerHTML.substr(0, max); // just in case
    // alert('Not allowed more than ' + max + ' characters');
  }
});

document.addEventListener("mouseup", function(e) {
  let temp_target = e.target;
  if (temp_target.classList.contains("color")) {
  }
});

const aaaaaaaaaaaaaaaaaa = () => {
  let background = document.querySelectorAll(".color");

  console.log(background);

  background.forEach(item => {
    item.addEventListener(
      "click",
      function() {
        console.log(item);

        document.getElementById(`input_${item.id}`).click();
      },
      false
    );

    document.getElementById(`input_${item.id}`).onchange = ev => {
      console.log(ev);
      file = ev.target.files[0];
      if (!file.type.match("image.*")) {
        return;
      }
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        return fetch(
          "https://us-central1-amptest-8287b.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: reader.result.replace(/^data:.+;base64,/, "")
            })
          }
        )
          .catch(err => console.log(err))
          .then(res => res.json())
          .then(parsedResult => {
            // item.style.backgroundImage = "url('" + e.target.result + "')";
            item.style.backgroundImage = `url(${parsedResult.imageUrl})`;
          });
      };

      reader.onerror = function() {
        console.log(reader.error);
      };
    };
  });
};
aaaaaaaaaaaaaaaaaa();

add.onclick = () => {
  // var amp = document.createElement("amp-fx-flying-carpet");
  // amp.setAttribute("height", "400px");
  // amp.setAttribute("id", "test");
  // var amp_img = document.createElement("amp-img");
  // amp_img.setAttribute("src", "paul-summers.jpg");
  // amp_img.setAttribute("width", "900");
  // amp_img.setAttribute("height", "900");
  // amp_img.setAttribute("alt", "Image");
  // amp.appendChild(amp_img);
  // paralax.appendChild(amp);
  paralax.innerHTML = `
  <div class="padding"></div>
<div class="amp-flying-carpet-wrapper">
    <div class="amp-fx-flying-carpet">
      <div class="amp-fx-flying-carpet-clip">
        <div class="amp-fx-flying-carpet-container">
          </div>
        </div>
      </div>
    </div>
</div>
<div class="padding"></div>
  `;
  add.disabled = true;
};

add_section.onclick = () => {
  var sectionBlock = document.createElement("section");

  var sectionDIv = document.createElement("div");
  sectionDIv.setAttribute("class", "container d-flex section");

  var foto_block = document.createElement("div");
  foto_block.setAttribute("class", "foto_block foto2 color");

  const childsInputs = document.querySelectorAll(".input");
  let prevId = +childsInputs[childsInputs.length - 1].id.substr(6);
  const currentId = prevId + 1;
  console.log(prevId, prevId + 1);
  foto_block.setAttribute("id", `${currentId}`);
  sectionDIv.appendChild(foto_block);

  var text_block = document.createElement("div");
  text_block.setAttribute("class", "text_block text");

  var text_block_title = document.createElement("h1");
  text_block_title.setAttribute("class", "text");
  text_block_title.setAttribute("contenteditable", "true");
  text_block_title.innerHTML = "Irina Iriser";
  text_block.appendChild(text_block_title);

  var text_block_p = document.createElement("p");
  text_block_p.setAttribute("class", "text");
  text_block_p.setAttribute("contenteditable", "true");
  text_block_p.innerHTML =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum numquam et amet, recusandae reiciendis itaque esse, inventore officiis atque quis tempore? Neque minus laudantium, quia pariatur quibusdam";

  text_block.appendChild(text_block_p);

  sectionDIv.appendChild(text_block);
  sectionBlock.appendChild(sectionDIv);

  const newInput = document.createElement("input");
  newInput.setAttribute("class", "input");
  newInput.setAttribute("style", "display: none;");
  newInput.setAttribute("id", `input_${currentId}`);
  newInput.setAttribute("type", "file");

  inputsContainer.appendChild(newInput);

  document
    .getElementsByTagName("body")[0]
    .insertBefore(
      sectionBlock,
      document.getElementsByClassName("tools__row")[0]
    );
  aaaaaaaaaaaaaaaaaa();
};

save.onclick = async () => {
  let target = document.getElementsByTagName("body");
  mainScript.remove();
  save.remove();
  let inputList = document.querySelectorAll(".input");

  for (let i = 0; i < inputList.length; i++) {
    inputList[i].remove();
  }
  let textList = document.querySelectorAll(".text");

  for (let i = 0; i < textList.length; i++) {
    delete textList[i].removeAttribute("contenteditable");
  }

  let newHtml = `<!DOCTYPE html>
  <html ⚡>
  
  <head id="headAmp">
    <meta charset="utf-8" />
    <title>Sample document</title>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <link rel="canonical" href="https://amp.dev/documentation/examples/components/amp-fx-flying-carpet/index.html" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
  
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "author": {
        "@type": "Person",
        "name": "Hrant Abrahamyan"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ShellLogix",
        "logo": {
          "@type": "ImageObject",
          "url": "/static/samples/img/favicon.png",
          "width": "512",
          "height": "512"
        }
        },
      "headline": "Article headline",
      "mainEntityOfPage": "http://amp-shelllogix.herokuapp.com/0bc446c0-2bbc-11ea-99e2-3177767a4b73.html",
      "dateModified": "2019-12-31T10:17:38+00:00",
      "image": ["thumbnail1.jpg"],
      "datePublished": "2019-12-30T10:17:38+00:00"
    }
    </script>
  
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
    <script async custom-element="amp-fx-flying-carpet" src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js">
    </script>
  
    <style amp-boilerplate>
      body {
        -webkit-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -moz-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        -ms-animation: -amp-start 8s steps(1, end) 0s 1 normal both;
        animation: -amp-start 8s steps(1, end) 0s 1 normal both;
      }
  
      @-webkit-keyframes -amp-start {
        from {
          visibility: hidden;
        }
  
        to {
          visibility: visible;
        }
      }
  
      @-moz-keyframes -amp-start {
        from {
          visibility: hidden;
        }
  
        to {
          visibility: visible;
        }
      }
  
      @-ms-keyframes -amp-start {
        from {
          visibility: hidden;
        }
  
        to {
          visibility: visible;
        }
      }
  
      @-o-keyframes -amp-start {
        from {
          visibility: hidden;
        }
  
        to {
          visibility: visible;
        }
      }
  
      @keyframes -amp-start {
        from {
          visibility: hidden;
        }
  
        to {
          visibility: visible;
        }
      }
    </style>
    <style amp-custom>
      body {
        margin: 0;
        padding: 0;
      }
  
      * {
        outline: none;
        box-sizing: border-box;
      }
  
      *:hover,
      *:focus {
        outline: none;
      }
  
      p {
        margin: 0;
      }
  
      .amp-flying-carpet-wrapper {
        overflow: hidden;
      }
  
      .amp-flying-carpet-text-border {
        background: black;
        color: white;
        padding: 0.25em;
      }
  
      .amp-fx-flying-carpet {
        height: 300px;
        overflow: hidden;
        position: relative;
      }
  
      .amp-fx-flying-carpet-clip {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
        margin: 0;
        padding: 0;
        clip: rect(0, auto, auto, 0);
        -webkit-clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%);
        clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%);
      }
  
      .amp-fx-flying-carpet-container {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        -webkit-transform: translateZ(0);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        background-size: cover;
        background-image: url(paul-summers.jpg);
      }
  
      .advert-image {
        position: relative;
        left: -800px;
      }
  
      .container {
        max-width: 1100px;
        padding: 0 20px;
        margin: 0 auto;
      }
  
      .d-flex {
        display: flex;
      }
  
      header {
        width: 100%;
        padding-top: 10px;
        margin-top: -20px;
        background: #071015;
      }
  
      .header div {
        width: 60px;
        height: 70px;
        background-image: url(assets/logo.jpg);
        background-size: cover;
        margin: 5px 0 15px;
        cursor: pointer;
      }
  
      .header_title {
        text-decoration: none;
        color: #3e6458;
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 900;
        max-width: 215px;
        margin: 0 auto;
      }
  
      section {
        padding: 20px 0;
        background: #f7f7f7;
      }
  
      .paralax_padding {
        padding: 0;
      }
  
      .foto_block {
        width: 50%;
        min-height: 350px;
      }
  
      .foto1 {
        background-image: url(./assets/img1.jpg);
        background-size: cover;
        background-position: center;
      }
  
      .foto2 {
        background-image: url(./assets/img2.jpg);
        background-size: cover;
        background-position: center;
      }
  
      .parallax__block {
        width: 100%;
        height: 300px;
        background: transparent;
        display: none;
      }
  
      .paralax {
        background-image: url(./assets/img3.jpg);
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        min-height: 150px;
      }
  
      @media (max-width: 768px) {
        .container {
          max-width: 100%;
          padding: 0 20px;
        }
  
        .parallax__block {
          display: block;
          padding: 0;
        }
  
        footer .footer {
          flex-direction: unset;
        }
  
        .footer_text {
          flex-direction: column;
        }
      }
  
      .text_block {
        width: 50%;
        padding: 0 0 0 10px;
        color: #3e6458;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .text {
        max-width: 100%;
        word-break: break-word;
      }
  
      footer {
        background: #071015;
      }
  
      .footer {
        flex-direction: column;
      }
  
      .footer_text {
        color: #3e6458;
        font-size: 14px;
        text-align: center;
        width: 100%;
        padding: 15px 0;
        cursor: pointer;
        justify-content: center;
      }
  
      .footer_text p {
        padding: 5px 10px;
      }
  
      .footer_logo {
        text-align: center;
        padding-bottom: 40px;
      }
  
      .footer_logo amp-img {
        margin-left: 15px;
      }
  
      .add_parallax {
        border: none;
        font-size: 13px;
        border-radius: 50%;
        background: rgba(235, 64, 52, 0.5);
        color: #fff;
        width: 60px;
        height: 60px;
        /* position: fixed; */
        bottom: 50%;
        top: unset;
        right: 20px;
        cursor: pointer;
      }
  
      .button_save {
        border: none;
        font-size: 14px;
        border-radius: 50%;
        background: rgba(235, 64, 52, 0.5);
        color: #fff;
        width: 60px;
        height: 60px;
        /* position: fixed; */
        bottom: 35px;
        top: unset;
        left: 20px;
        cursor: pointer;
      }
  
      .display-none {
        display: none;
      }
  
      .tools__row {
        display: flex;
        align-items: center;
        padding: 15px;
        margin-right: 28px;
        justify-content: space-between;
      }
  
      @media (max-width: 30rem) {
        .land-see-flying-carpet {
          display: block;
        }
  
        .land-see-blockquote {
          padding: 1rem;
        }
      }
    </style>
    <noscript>
      <style amp-boilerplate>
        body {
          -webkit-animation: none;
          -moz-animation: none;
          -ms-animation: none;
          animation: none;
        }
      </style>
    </noscript>
  </head>
  
  <body style="opacity: 1; visibility: visible; animation: 0s ease 0s 1 normal none running none;" class="amp-mode-mouse">
        ${document.body.innerHTML}
        </body>
  </html>`;

  console.log(newHtml);
  try {
    const rawResponse = await fetch("/new", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        html: newHtml
      })
    });
    location.replace(rawResponse.url);
    // console.log(rawResponse);
  } catch (e) {}
};
