const portalId = "de2ee0f8eb5510707011341884fe3c11ec21adc8873698b141caf3a01fde26a6"

$(document).ready(function () {
    let categories = getCategory()
    setCategory(categories)
})

function getCategory() {
    let list = new Map()

    $.get("https://desk.zoho.com/portal/api/kbCategories", { "portalId": portalId }, function (response) {
        response.data[0].child.forEach(element => {
            list.set(element.name, element.child[0].id)
        })
    }, "json")
        .fail(function () {
            list.set("error", "sorry, we couldn't get lists")
        })

    return list
}

function setCategory(categories) {
    let html
    categories.forEach((v, k) => {
        console.log("<div data-id='" + k + "'>" + v + "</div>")
    })

    $("#category-section").html(html)
}