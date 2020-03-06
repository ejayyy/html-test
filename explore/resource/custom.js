$(function () {
    let controller = new ScrollMagic.Controller()

    controller.scrollPos(function () {
        return window.innerWidth > 1024 ? window.pageYOffset : 0
    })

    new ScrollMagic.Scene({ triggerElement: "#trigger2", offset: 400, duration: 1700 })
        .setPin("#scene2").addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene2", offset: 420 })
        .setClassToggle(".scene2-wireless", "is-visible").addTo(controller)

    let scene2Imgs = ["https://cdn.shopify.com/s/files/1/0168/7781/3860/files/Scene_02_d_01.jpg?v=1582652422",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/Scene_02_d_02.jpg?v=1582652422",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/Scene_02_d_03.jpg?v=1582652422"],
        scene2Img = document.getElementById("scene2-img")

    new ScrollMagic.Scene({ triggerElement: "#scene2", offset: 1120 })
        .setTween("#scene2-subtext1", { top: -70 }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene2", offset: 1120 })
        .setTween("#scene2-subtext3", { top: 70 }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene2", offset: 1120 })
        .setTween("#scene2-subtext2", { top: 0 }).addTo(controller)
        .on("enter leave", function (e) {
            scene2Img.classList.remove("is-visible")
            scene2Img.src = e.type == "enter" ? scene2Imgs[1] : scene2Imgs[0]

            setTimeout(function () {
                scene2Img.classList.add("is-visible")
            }, 250)
        })

    new ScrollMagic.Scene({ triggerElement: "#scene2", offset: 1720 })
        .setTween("#scene2-subtext1", { top: -140 }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene2", offset: 1720 })
        .setTween("#scene2-subtext2", { top: -70 }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene2", offset: 1720 })
        .setTween("#scene2-subtext3", { top: 0 }).addTo(controller)
        .on("enter leave", function (e) {
            scene2Img.classList.remove("is-visible")
            scene2Img.src = e.type == "enter" ? scene2Imgs[2] : scene2Imgs[1]

            setTimeout(function () {
                scene2Img.classList.add("is-visible")
            }, 250)
        })



    new ScrollMagic.Scene({ triggerElement: "#scene3", duration: 200, offset: 280 })
        .setTween("#scene3-img-container", 0.5, { scale: 1.6 }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene3", duration: 200, offset: 280 })
        .setTween("#scene3-img", 0.5, { margin: 0, maxWidth: 1150 }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#trigger3", duration: 80, offset: 650 })
        .setPin("#scene3").addTo(controller)



    new ScrollMagic.Scene({ triggerElement: "#trigger4", duration: 500, offset: 350 })
        .setPin("#scene4").addTo(controller)

    new ScrollMagic.Scene({ triggerElement: "#scene4", offset: 400 })
        .setTween("#scene4-img1", { transform: "translate(0px, 1px)" }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene4", offset: 400 })
        .setClassToggle("#scene4-text", "is-visible")
        .setTween("#scene4-text", { marginTop: 0 }).addTo(controller)

    new ScrollMagic.Scene({ triggerElement: "#scene4", offset: 430 })
        .setTween("#scene4-img2", { transform: "translate(0px, 151.74px)" })
        .addTo(controller)



    let scene5Imgs = ["https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00014.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00016.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00017.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00018.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00021.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00022.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00023.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00024.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00026.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00028.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00029.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00030.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00031.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00034.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00036.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00037.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00042.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00045.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00046.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00047.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00048.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00050.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00051.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00053.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00057.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00059.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00061.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00062.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00065.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00066.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00067.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00068.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00070.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00071.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00077.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00079.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00081.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00082.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00084.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00089.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00090.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00093.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00094.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00095.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00097.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00101.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00102.jpg?v=1582652926",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00105.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00106.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00108.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00109.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00110.jpg?v=1582652925",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/all_00111.jpg?v=1582652925"]
    let obj5 = { curImg: 0 };
    new ScrollMagic.Scene({ triggerElement: "#trigger5", duration: 1700, offset: 350 })
        .setPin("#scene5").addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene5", offset: 340 })
        .setClassToggle("#scene5-text", "is-visible")
        .setTween("#scene5-text", { marginTop: 0 }).addTo(controller)

    let tween = TweenMax.to(obj5, 0.5, {
        curImg: scene5Imgs.length - 1,
        roundProps: "curImg",
        immediateRender: true,
        ease: Linear.easeNone,
        onUpdate: function () {
            $("#scene5-img").attr("src", scene5Imgs[obj5.curImg]);
        }
    })
    new ScrollMagic.Scene({ triggerElement: "#scene5", duration: 1700, offset: 400 })
        .setTween(tween).addTo(controller)



    new ScrollMagic.Scene({ triggerElement: "#trigger6", duration: 1200, offset: 330 })
        .setPin("#scene6").addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene6", offset: 280 })
        .setClassToggle("#scene6-text", "is-visible").setTween("#scene6-text", { marginTop: 0 })
        .addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#scene6", offset: 300 })
        .setTween("#scene6-heading", { marginBottom: 76 }).addTo(controller)

    let scene6Subtext = ["Salt-water testing", "Extreme temperature testing", "Drop testing"]
    new ScrollMagic.Scene({ triggerElement: "#scene6", offset: 700 })
        .on("enter leave", function (e) {
            document.getElementById("scene6-subtext").innerHTML = e.type == "enter" ? scene6Subtext[1] : scene6Subtext[0]
        })
        .setTween("#scene6-img1", { marginLeft: "-100%" })
        .addTo(controller)

    new ScrollMagic.Scene({ triggerElement: "#scene6", offset: 1100 })
        .on("enter leave", function (e) {
            document.getElementById("scene6-subtext").innerHTML = e.type == "enter" ? scene6Subtext[2] : scene6Subtext[1]
        })
        .setTween("#scene6-img2", { marginLeft: "-100%" })
        .addTo(controller)



    new ScrollMagic.Scene({ triggerElement: "#trigger7", duration: 900, offset: 380 })
        .setPin("#scene7")
        .addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#trigger7", offset: 430 })
        .setClassToggle("#scene7-heading", "is-visible")
        .setTween("#scene7-heading", { transform: "translateY(-30px)" }).addTo(controller)

    let scene7Imgs = ["https://cdn.shopify.com/s/files/1/0168/7781/3860/files/Scene_07_d_01.jpg?v=1582653875",
        "https://cdn.shopify.com/s/files/1/0168/7781/3860/files/Scene_07_d_02.jpg?v=1582653875"]
    let obj7 = { curImg: 0 };
    let tween7 = TweenMax.to(obj7, 0.5, {
        curImg: scene7Imgs.length - 1,
        roundProps: "curImg",
        immediateRender: true,
        ease: Linear.easeNone,
        onUpdate: function () {
            $("#scene7-img").attr("src", scene7Imgs[obj7.curImg])
        }
    })
    new ScrollMagic.Scene({ triggerElement: "#trigger7", offset: 650, duration: 200 })
        .setTween(tween7).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#trigger7", offset: 700, duration: 200 })
        .setTween("#scene7-subtext", 0.5, { display: "block", height: 250 }).addTo(controller)
    new ScrollMagic.Scene({ triggerElement: "#trigger7", offset: 750 })
        .setClassToggle(".scene7-subtext-container", "is-visible").addTo(controller)



    $('#scene6-slider').owlCarousel({
        items: 1
    })
});