const FileSaver = require('file-saver');

function parse_row_symbol(element) {

    switch (element.getAttribute("class")) {
        case "success":
            return '✓'
    
        case "failure":
            return '✗'
        
        default:
            console.error(`unexpected class name ${element.className} while parsing column 0.`);
            return 'error-dummy'
    }
}

function parse_row_date(element) {
    if (element.className != "date-text") {
        console.error(`unexpected class name ${element.className} while parsing column 1.`);
    }
    return element.innerText
}

function parse_row_time(element) {
    if (element.className != "time-text") {
        console.error(`unexpected class name ${element.className} while parsing column 2.`);
    }
    return element.innerText
}

function parse_row_merchant(element) {
    if (element.className != "merchant-text") {
        console.error(`unexpected class name ${element.className} while parsing column 3.`);
    }
    return element.innerText
}

function parse_row_price(element) {
    if (element.className != "product-price-text") {
        console.error(`unexpected class name ${element.className} while parsing column 4.`);
    }
    return element.innerText
}

function parse_row_message(element) {
    element.id = "t567"
    if (element.tagName != "P") {
        console.error(`unexpected tag ${element.tagName} while parsing column 5.`);
    }

    child = element.children[0] //wrapped in <p> 

    if (child.tagName != "SPAN") {
        console.error(`unexpected inner tag ${child.tagName} while parsing column 5.`);
    }

    if (!child.className.match(/transaction-( success|error)-message/)) {
            console.error(`unexpected inner class name ${child.className} while parsing column 6.`);
    }
    return child.innerText
}

function parse_row(div) {
    symbol  = parse_row_symbol  (div.childNodes[0])
    date    = parse_row_date    (div.children[1])
    time    = parse_row_time    (div.children[2])
    merchant= parse_row_merchant(div.children[3])
    price   = parse_row_price   (div.children[4])
    message = parse_row_message (div.childNodes[5])
    return [symbol, date, time, merchant, price, message] 
}

extract_transactions = function() {
    container = document.getElementsByClassName("scroll-container")[0]
    children = Array.from(container.children)

    transactions_as_array = Array.from(container.children)
       .filter(element => element.className == 'order-history-container')
       .map(parse_row);
    
    return transactions_as_array
}

quote = s => `"${s}"`

convert_to_csv = function(arr) {
    head = "symbol,date,time,merchant,price,message"
       .split(",").map(quote).join(",")+"\n"

    content = arr.map(r => r.map(quote).join(",") + "\n")
    return [head].concat(content)
}

extract_dates = function() {
    dates = Array.from(document.getElementsByTagName('input')).filter(input => input.type == "date")
    maybe_from = dates.find(i => i.attributes.getNamedItem('data-testid').value == "date-start").value
    maybe_to   = dates.find(i => i.attributes.getNamedItem('data-testid').value == "date-end").value
    date_from = maybe_from ? maybe_from : 'x'
    date_to   = maybe_to   ? maybe_to   : 'y'
    return [date_from, date_to]
}

export_csv = function() {
    a = extract_transactions()
    b = convert_to_csv(a)
    res = extract_dates()
    _from = res[0].replaceAll('-','_')
    _to   = res[1].replaceAll('-','_')
    console.log(_from)
    console.log(_to)
    var blob = new Blob(b, {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, `sodexo_transactions_${_from}_to_${_to}.txt`);
}

//add button
button_pdf = document.getElementsByClassName('download-transaction-pdf   __btn')[0]

button_csv = document.createElement('Button')
button_csv.id = "csv-button"
button_csv.textContent="Transaktionen herunterladen (csv)"
button_csv.onclick = export_csv

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

insertAfter(button_csv, button_pdf)