const portalId = "de2ee0f8eb5510707011341884fe3c11ec21adc8873698b141caf3a01fde26a6"
const detailContainer = $("#category-detail")

getCategory().then(function (categories) {
    setCategory(categories)
    $("#category-box button:first").click()
})

async function getCategory() {
    try {
        let list = new Map()
        let childList = null

        await $.get("https://desk.zoho.com/portal/api/kbCategories", { "portalId": portalId }, function (defs) {
            defs.data[0].child.forEach(element => {

                childList = []
                childList.push(element.id)

                if (element.child != null)
                    element.child.forEach(child => { childList.push(child.id) })

                list.set(element.name, childList)
            })
        })
        return list;
    } catch {
        return null;
    }
}

function setCategory(categories) {
    let html = ""

    categories.forEach((v, k) => {
        html += "<button onClick='getCategoryDetail(this)' "

        for (let i = 0; i < v.length; i++)
            html += "data-" + i + "='" + v[i] + "' "

        html += "><img src='" + getImageResource(k) + "' /><p>" + k + "</p></button>"
    })

    $("#category-box").html(html)
}

function getCategoryDetail(category) {

    addActiveCss(category)

    let param = { "portalId": portalId, "sortBy": "createdTime" }
    let ids = $(category).data()

    detailContainer.empty().hide()

    $.each(ids, function (i, v) {
        param.categoryId = v

        $.get("https://desk.zoho.com/portal/api/kbArticles", param, function (resp) {
            const list = resp.data

            setCategoryDetail(category.textContent, list)
        }).fail(function (e) {
            console.log("get detail error : ")
            console.log(e)
        })
    })

    detailContainer.fadeIn()
}

function setCategoryDetail(parentName, details) {
    let category

    try {
        if (parentName !== "Search Result")
            category = details[0].category.name
        else
            category = parentName

        let html = "<div class='detail-title'><img src='" + getImageResource(parentName) + "'><h3>" +
            category + "</h3></div>" + "<div class='detail-sub'>"

        details.forEach((v) => {
            html += '<div><div id="heading' + v.id + '">' +
                '<a class="title" data-toggle="collapse" data-target="#collapse' + v.id +
                '" aria-expanded="true" aria-controls="collapseOne" onclick="getArticle(\'' + v.id + '\')" onchange="changeChevron(this)">' +
                v.title +
                '<i class="float-right fal fa-chevron-down"></i></a></div>' +
                '<div id="collapse' + v.id + '" class="collapse" aria-labelledby="heading' + v.id + '" data-parent="#category-detail">' +
                '<div class="detail-body">' + v.summary +
                '</div></div></div>'
        })
        html += "</div>"

        $("#category-detail").append(html)
    } catch (e) {
        console.log(e)
    }
}

function getArticle(articleId) {
    $.get("https://desk.zoho.com/portal/api/kbArticles/" + articleId, { "portalId": portalId }, function (resp) {
        setArticle(articleId, resp.answer)
    })
}

function setArticle(articleId, article) {
    $("#collapse" + articleId + " .detail-body").html(article.replace(/<div><br \/><\/div>/g, ""))
}

function searchArticle() {
    let param = { "portalId": portalId, "searchStr": $("#search").val() }

    $("#category-box").children().removeClass("category-active")
    detailContainer.empty().hide()

    $.get("https://desk.zoho.com/portal/api/kbArticles/search", param, function (resp) {
        const list = resp.data

        if (list.length < 1)
            list.push({ id: "", title: "No Result", summary: "Please Search Again" })

        setCategoryDetail("Search Result", list)
    }).fail(function (e) {
        console.log("get detail error : ")
        console.log(e)
    })
    detailContainer.fadeIn()
}

function addActiveCss(category) {
    const activeClass = "category-active"
    $(category).addClass(activeClass).siblings().removeClass(activeClass)
}

function getImageResource(rawName) {
    let fileName = rawName.replace(/[^A-Z0-9]+/ig, "").toLowerCase() + ".png"
    let liquidPath = '{{ 'filename' | asset_url }}'

    return liquidPath.replace("filename", fileName)
}

function changeChevron(i) {
    console.log(i)
}