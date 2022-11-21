Input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        if (Input.value != "") {
            let result = "";
            let urlIdea = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${Input.value}`;
            let data = JSON.parse(getData(urlIdea));
            // console.log(data);
            let obj = [];
            if (data[1] != undefined) {
                for (let i in data[1]) {
                    let thumb = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${data[1][i]}`
                    let thumbEach = JSON.parse(getData(thumb));
                    console.log(thumbEach);
                    let page = thumbEach.query.pages;
                    let pageEach;
                    for (let key in page) {
                        pageEach = page[`${key}`];
                    }
                    if (pageEach.thumbnail == undefined) {
                        if (pageEach.pageprops == undefined) {
                            let arr = ["/error image/anh-gai-trung-quoc-cuc-dep.jpg", pageEach.title, "no scrip", data[3][i]];
                            obj.push(arr);
                        } else {
                            let arr = ["/error image/anh-gai-trung-quoc-cuc-dep.jpg", pageEach.title, pageEach.pageprops["wikibase-shortdesc"], data[3][i]];
                            obj.push(arr);
                        }
                    } else {
                        if (pageEach.title != undefined && pageEach.pageprops["wikibase-shortdesc"] != undefined) {
                            let arr = [pageEach.thumbnail.source, pageEach.title, pageEach.pageprops["wikibase-shortdesc"], data[3][i]];
                            obj.push(arr);
                        }
                    }
                }
            }
            console.log(obj);
            for (let i = 0; i < obj.length; i++) {
                result += `
                                <div class="infor-each">
                                    <div class="box">
                                        <img class="img" src="${obj[i][0]}" alt="">
                                    </div>
                                    <div class="text">
                                        <div class="title"><strong>${obj[i][1]}</strong></div>
                                        <div class="pageprops">${obj[i][2]}</div>
                                    </div>
                                </div>
                            `
            }
            infor.innerHTML = result;
            let inforWeb = document.getElementsByClassName("infor-each");
            for (let i = 0; i < inforWeb.length; i++) {
                inforWeb[i].addEventListener("click", () => {
                    window.location.href = `${obj[i][3]}`;
                })
            }
        }

    }
})

// * Sủ dụng bất đồng bộ
// let data = async (value) => {
//     let urlIdea = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${value}`;
//     let data = await JSON.parse(getData(urlIdea));
//     return data
// }
let getData = (url) => {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
    return req.responseText;
}
// let getThumb = async (value) => {
//     let thumb = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${value}`
//     let thumbEach = JSON.parse(getData(thumb));
//     console.log(thumbEach);
//     let page = thumbEach.query.pages;
//     let pageEach;
//     for (let key in page) {
//         pageEach = page[`${key}`];
//     }
//     return pageEach;
// }
// Input.addEventListener("keydown", (e) => {
//     if (e.key == "Enter") {
//         if (Input.value != "") {
//             let result = "";
//             data(Input.value)
//                 .then((data) => {
//                     let obj = [];
//                     if (data[1] != undefined) {
//                         for (let i = 0; i < data[1].length; i++) {
//                             let result = "";
//                             getThumb(data[1][i])
//                                 .then((getdata) => {
//                                     console.log(getdata);
//                                     if (getdata.thumbnail == undefined) {
//                                         if (getdata.pageprops == undefined) {
//                                             let arr = ["/exercise01/error image/anh-gai-trung-quoc-cuc-dep.jpg", getdata.title, "no scrip", data[3][i]];
//                                             obj.push(arr);
//                                         } else {
//                                             let arr = ["/exercise01/error image/anh-gai-trung-quoc-cuc-dep.jpg", getdata.title, getdata.pageprops["wikibase-shortdesc"], data[3][i]];
//                                             obj.push(arr);
//                                         }
//                                     } else {
//                                         if (getdata.title != undefined && getdata.pageprops["wikibase-shortdesc"] != undefined) {
//                                             let arr = [getdata.thumbnail.source, getdata.title, getdata.pageprops["wikibase-shortdesc"], data[3][i]];
//                                             obj.push(arr);
//                                         }
//                                     }
//                                     for (let j = 0; j < obj.length; j++) {
//                                         result += `
//                                                 <div class="infor-each">
//                                                     <div class="box">
//                                                         <img class="img" src="${obj[j][0]}" alt="">
//                                                     </div>
//                                                     <div class="text">
//                                                         <div class="title"><strong>${obj[j][1]}</strong></div>
//                                                         <div class="pageprops">${obj[j][2]}</div>
//                                                     </div>
//                                                 </div>
//                                             `
//                                     }
//                                     return result;
//                                 })
//                                 .then((result) => {
//                                     infor.innerHTML = result;
//                                     let inforWeb = document.getElementsByClassName("infor-each");
//                                     for (let j = 0; j < inforWeb.length; j++) {
//                                         inforWeb[j].addEventListener("click", () => {
//                                             window.location.href = `${obj[j][3]}`;
//                                         })
//                                     }
//                                 })
//                         }

//                     }

//                 })
//         }
//     }
// })
