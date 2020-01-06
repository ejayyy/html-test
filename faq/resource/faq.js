const generalParam = { 'portalId': "" }
const url = {
    "category": "https://desk.zoho.com/portal/api/kbCategories",
    "detailList": "https://desk.zoho.com/portal/api/kbArticles",
    "detail": "https://desk.zoho.com/portal/api/kbArticles/",
    "search": "https://desk.zoho.com/portal/api/kbArticles/search"
}
const errorHtml = "<div class='text-center'><h3>Sorry, We can't load this page.</h3></div>", searchTitle = 'Search',
    detailContainer = $("#category-detail")

getCategory().then(function (categories) {
    setCategory(categories)

    let query = location.search, categoryParam = null, result = {}
    if (query.length > 0) {
        query = decodeURIComponent(query.substr(1))

        let article = '&article=', keyword = '&keyword=', category = 'category='
        if (query.indexOf(article) > -1) {
            query = query.split('&article=')
            result.article = query[1]
            query = query[0]
        }
        if (query.indexOf(keyword) > -1) {
            query = query.split('&keyword=')
            result.keyword = query[1].toLowerCase()

            searchArticle(result.keyword, result.article)
            $('#search').val(result.keyword)

            $(window).on('load', function () {
                let parent = null

                $('.detail-sub a').each(function () {
                    if (this.textContent.toLowerCase() === result.article) {
                        parent = $(this).parent()[0]

                        setDetailsTag(parent)
                        $(this).attr('aria-expanded', true)
                        $(parent).siblings().addClass('show')
                        setScrollTo('#' + parent.id)
                        return false
                    }
                })
            })
            return
        }

        if (query.indexOf(category) > -1) {
            query = query.split('category=')
            result.category = query[1].replace(/(category=)|(\s)/g, '')
            categoryParam = result.category
            query = query[0]
        }

        $('#category-box p').each(function () {
            text = $(this).text().replace(/\s/g, '').toLowerCase()

            if (text == result.category) {
                getCategoryDetail($(this).parent()[0])
                setArticleParam(result.article)
                return false
            }
        })
    } else {
        $("#category-box button:first").click()
        categoryParam = $("#category-box button:first").text()
    }
    setUrl(categoryParam, result.article, result.keyword)
})

function setArticleParam(article) {
    let param = { ...generalParam }
    param.searchStr = article

    $.get(url.search, param, function (resp) {
        const articleId = resp.data[0].id
        getArticle(null, articleId)

        let targetId = '#collapse' + articleId
        $(targetId).attr('open', '')
        setScrollTo(targetId)
    })
}

function setScrollTo(target) {
    let height = $(target).offset().top
    $([document.documentElement, document.body]).animate({
        scrollTop: typeof height != null ? height - 50 : $('#category-box').offset().top
    }, 2000);
}

async function getCategory() {
    let list = new Map()
    let childList = null

    await $.get(url.category, generalParam, function (defs) {
        defs.data[0].child.forEach(element => {

            childList = []
            childList.push(element.id)

            if ("child" in element)
                element.child.forEach(child => { childList.push(child.id) })

            list.set(element.name, childList)
        })
    })
    return list;
}

function setCategory(categories) {
    let html = []

    categories.forEach((v, k) => {
        html.push("<button onClick='getCategoryDetail(this)' ")

        for (let i = 0; i < v.length; i++)
            html.push("data-", i, "='", v[i], "' ")

        html.push("><img src='", getImageResource(k), "' /><p>", k, "</p></button>")
    })

    $("#category-box").html(html.join(''))
}

function getCategoryDetail(category) {
    preDetailContainerLoad(category)
    setUrl($(category).text())

    let param = { ...generalParam }
    param.sortBy = 'createdTime'

    let ids = $(category).data()
    $.each(ids, function (i, v) {
        param.categoryId = v

        $.get(url.detailList, param, function (resp) {
            const list = resp.data

            if (list.length > 0)
                setCategoryDetail(category.textContent, list)

        }).fail(function (e) {
            detailContainer.html(errorHtml)
            console.log(e)
        })
    })

    pstDetailContainerLoad()
}

function setCategoryDetail(parentName, details) {
    let category, html

    try {
        category = "category" in details[0] ? details[0].category.name : parentName

        html = ["<div class='detail-title'>"]
        if (category != searchTitle)
            html.push("<img src='", getImageResource(parentName), "'/>")
        html.push("<h3>", category, "</h3></div>", "<div class='detail-sub'>")

        details.forEach((v) => {
            html.push('<div><div id="heading', v.id, '" onclick="setDetailsTag(this)">',
                '<a class="title" data-toggle="collapse" data-target="#collapse', v.id,
                '" aria-expanded="false" aria-controls="collapseOne">', v.title, '<i class="float-right"></i></a></div>',
                '<div id="collapse', v.id, '" class="collapse" aria-labelledby="heading', v.id,
                '" data-parent="#category-detail" data-category="', category,
                '" data-id="', v.id, '"><div class="detail-body">', v.summary, '</div></div></div>')
        })
        html.push("</div>")

    } catch (e) {
        html = errorHtml
        console.log(e)
    }
    $("#category-detail").append(html.join(''))
}

function getArticle(category, articleId, keyword) {
    $.get(url.detail.concat(articleId), generalParam, function (resp) {
        setArticle(articleId, resp.answer)
        setUrl(category, resp.title, keyword)
    })
}

function setArticle(articleId, article) {
    let id = "#collapse".concat(articleId, " .detail-body")
    $(id).html(article.replace(/<div><br \/><\/div>/g, ""))
}

function searchArticle(preset, article) {
    let keyword = preset == null ? $("#search").val() : preset
    if (keyword.length < 1)
        return

    preDetailContainerLoad("#category-box button")

    let param = { ...generalParam }
    param.searchStr = keyword

    $.get(url.search, param, function (resp) {
        const list = resp.data

        if (list.length < 1)
            list.push({ title: "No Result", summary: "Please Search Again" })

        setCategoryDetail(searchTitle, list)
    }).fail(function (e) {
        detailContainer.html(errorHtml)
        console.log("get detail error : ", e)
    })

    pstDetailContainerLoad()

    setUrl(searchTitle, article, keyword)
}

function addActiveCss(category) {
    let activeClass = "category-active"
    $(category).addClass(activeClass).siblings().removeClass(activeClass)
}

function preDetailContainerLoad(activeClass) {
    addActiveCss(activeClass)
    detailContainer.empty().hide()
}

function pstDetailContainerLoad() {
    detailContainer.fadeIn()
}

function getImageResource(rawName) {
    let fileName = (rawName.replace(/[^A-Z0-9]+/ig, "").toLowerCase()).concat(".png")
    let liquidPath = '//cdn.shopify.com/s/files/1/0015/1810/8724/t/42/assets/filename?24099'

    return liquidPath.replace("filename", fileName)
}

function setUrl(category, article, keyword) {
    let prefix = '/pages/faq', url = prefix

    if (category != null)
        url = url.concat('?category=', category)
    if (keyword != null)
        url = url.concat('&keyword=', keyword)
    if (article != null)
        url = url.concat('&article=', article)

    window.history.pushState('', '', url.toLowerCase())
}

function setDetailsTag(eventThis) {
    let $this = $(eventThis),
        $summary = $this.parent().find('.collapse'), keyword = null,
        category = $('.category-active').text().length > 0 ? $('.category-active').text() : $summary.attr('data-category')

    if (category === searchTitle) {
        keyword = location.search.split('&keyword=')[1]
        index = keyword.indexOf('&article=')
        if (index > -1)
            keyword = keyword.substring(0, index)
    }

    if ($this.find('a').attr("aria-expanded") != 'true')
        getArticle(category, $summary.attr('data-id'), keyword)
    else
        setUrl(category, null, keyword)
}