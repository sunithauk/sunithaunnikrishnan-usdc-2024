/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    let resultsArr = [];
    //Loop through all books in scannedTextObj.
    for (let i = 0; i < scannedTextObj.length; i++) {
        let book = scannedTextObj[i];
        verifyBook(book);
        let content = book.Content;
        //Loop through all excerpts in the book's content.
        for (let j = 0; j < content.length; j++) {
            let excerpt = content[j];
            verifyExcerpt(excerpt);
            let text = excerpt.Text;
            if (text.includes(searchTerm)) {
                resultsArr.push({
                    "ISBN": book.ISBN,
                    "Page": excerpt.Page,
                    "Line": excerpt.Line
                })
            }
        }
    }
    var result = {
        "SearchTerm": searchTerm,
        "Results": resultsArr
    };
    return result; 
}

function verifyBook(book) {
    if (book.Title == undefined) {
        throw new Error("Malformed input. Book must have Title field.")
    } else if (book.ISBN == undefined) {
        throw new Error("Malformed input. Book must have ISBN field.")
    } else if (book.Content == undefined) {
        throw new Error("Malformed input. Book must have Content field.")
    }
}

function verifyExcerpt(excerpt) {
    if (excerpt.Text == undefined || typeof(excerpt.Text) != "string") {
        throw new Error("Malformed input. Excerpt must have Text field that is of type string.")
    } else if (excerpt.Page == undefined) {
        throw new Error("Malformed input. Excerpt must have Page field.")
    } else if (excerpt.Line == undefined) {
        throw new Error("Malformed input. Excerpt must have Line field.")
    }
}


/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]


    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}



/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/* My Unit Tests */

/* Input Data */
const HarryPotterBooks = [
    {
        "Title" : "Harry Potter and the Sorcerer's Stone",
        "ISBN" : "1338878921",
        "Content" : [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Mr. and Mrs. Dursley, of number four, Privet DRiVE"
            },
            {
                "Page": 30,
                "Line": 10,
                "Text": "Harry walked round and round his new room"
            },
            {
                "Page": 40,
                "Line": 15,
                "Text": "local Questions Exploded inside Harry\'s head like fireworks"
            },
        ]
    },
    {
        "Title" : "Harry Potter and the Prisoner of Azkaban",
        "ISBN" : "0545582938",
        "Content" : [
            {
                "Page": 6,
                "Line": 4,
                "Text": "I couldn't believe it when Dad won the Daily Prophet DRIVE."
            },
            {
                "Page": 10,
                "Line": 2,
                "Text": "There's some interesting local history of exploded witchcraft here, too."
            },
            {
                "Page": 21,
                "Line": 6,
                "Text": "The Aunt Marge narrowed her eyes."
            },
        ]
    },
]

const EmptyBooksArray = []

/* POSITIVE TESTS */
console.log("Positive Tests")

/* Positive Test Case 1: Simple */
const HarryPotterOut1 = {
    "SearchTerm": "believe",
    "Results": [
        {
            "ISBN" : '0545582938', 
            "Page" : 6, 
            "Line" : 4
        }
    ]
}
const myTest1result = findSearchTermInBooks("believe", HarryPotterBooks);
if (JSON.stringify(HarryPotterOut1) === JSON.stringify(myTest1result)) {
    console.log("PASS: My Custom Positive Test 1");
} else {
    console.log("FAIL: My Custom Positive Test 1");
    console.log("Expected:", HarryPotterOu1);
    console.log("Received:", myTest1result);
}

/* Positive Test Case 2: repeated word in same line */
const HarryPotterOut2 =  {
    "SearchTerm" : "round",
    "Results":  [
        {
            "ISBN": "1338878921",
            "Page": 30,
            "Line": 10
        },
    ]
}
const myTest2result = findSearchTermInBooks("round", HarryPotterBooks);
if (JSON.stringify(HarryPotterOut2) === JSON.stringify(myTest2result)) {
    console.log("PASS: My Custom Positive Test 2");
} else {
    console.log("FAIL: My Custom Positive Test 2");
    console.log("Expected:", HarryPotterOut2);
    console.log("Received:", myTest2result);
}

/* Positive Test Case 3: multiple occurences */
const HarryPotterOut3 = {
    "SearchTerm": "local",
    "Results": [
        {
            "ISBN": "1338878921",
            "Page": 40,
            "Line": 15
        },
        {
            "ISBN": "0545582938",
            "Page": 10,
            "Line": 2
        }
    ]
}
const myTest3result = findSearchTermInBooks("local", HarryPotterBooks);
if (JSON.stringify(HarryPotterOut3) === JSON.stringify(myTest3result)) {
    console.log("PASS: My Custom Positive Test 3");
} else {
    console.log("FAIL: My Custom Positive Test 3");
    console.log("Expected:", HarryPotterOut3);
    console.log("Received:", myTest3result);
}

/* Negative Tests */
console.log("Negative Tests")

/* Negative Test 1: Simple */
const negativeOut1 = {
    "SearchTerm" : "digital",
    "Results" : []
}
const negativeTest1result = findSearchTermInBooks("digital", HarryPotterBooks);
if (JSON.stringify(negativeOut1) === JSON.stringify(negativeTest1result)) {
    console.log("PASS: My Custom Negative Test 1");
} else {
    console.log("FAIL: My Custom Negative Test 1");
    console.log("Expected:", negativeOut1);
    console.log("Received:", negativeTest1result);
}


/* Negative Test 2: Empty Books Array */
const negativeOut2 = {
    "SearchTerm" : "excellent",
    "Results" : []
}
const negativeTest2result = findSearchTermInBooks("excellent", EmptyBooksArray);
if (JSON.stringify(negativeOut2) === JSON.stringify(negativeTest2result)) {
    console.log("PASS: My Custom Negative Test 2");
} else {
    console.log("FAIL: My Custom Negative Test 2");
    console.log("Expected:", negativeOut2);
    console.log("Received:", negativeTest2result);
}

const negativeOut3 = {
    "SearchTerm" : "dRIve",
    "Results" : []
}

/* Negative Test 3: Incorrect capitilization */
const negativeTest3result = findSearchTermInBooks("dRIve", HarryPotterBooks);
if (JSON.stringify(negativeOut3) === JSON.stringify(negativeTest3result)) {
    console.log("PASS: My Custom Negative Test 3");
} else {
    console.log("FAIL: My Custom Negative Test 3");
    console.log("Expected:", negativeOut3);
    console.log("Received:", negativeTest3result);
}

/* Case-Sensitive Tests */
console.log("Case Senstive Tests")

/* Case-Sensitive Test 1: Simple */
const caseSensitiveOut1 = 
{
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "0545582938",
            "Page": 6,
            "Line": 4
        }
    ]
}
const caseSensitiveTest1 = findSearchTermInBooks("the", HarryPotterBooks);
if (JSON.stringify(caseSensitiveOut1) === JSON.stringify(caseSensitiveTest1)) {
    console.log("PASS: My Custom Case Sensitive Test 1");
} else {
    console.log("FAIL: My Custom Case Sensitive Test 1");
    console.log("Expected:", caseSensitiveOut1);
    console.log("Received:", caseSensitiveTest1);
}

/* Case-Sensitive Test 2: Capitalized Search Term */
const caseSensitiveOut2 = 
{
    "SearchTerm": "Exploded",
    "Results": [
        {
            "ISBN": "1338878921",
            "Page": 40,
            "Line": 15
        }
    ]
}
const caseSensitiveTest2 = findSearchTermInBooks("Exploded", HarryPotterBooks);
if (JSON.stringify(caseSensitiveOut2) === JSON.stringify(caseSensitiveTest2)) {
    console.log("PASS: My Custom Case Sensitive Test 2");
} else {
    console.log("FAIL: My Custom Case Sensitive Test 2");
    console.log("Expected:", caseSensitiveOut2);
    console.log("Received:", caseSensitiveTest2);
}

/* Case-Sensitive Test 3: ALL CAPS */
const caseSensitiveOut3 = 
{
    "SearchTerm": "DRIVE",
    "Results": [
        {
            "ISBN": "0545582938",
            "Page": 6,
            "Line": 4
        }
    ]
}
const caseSensitiveTest3 = findSearchTermInBooks("DRIVE", HarryPotterBooks);
if (JSON.stringify(caseSensitiveOut3) === JSON.stringify(caseSensitiveTest3)) {
    console.log("PASS: My Custom Case Sensitive Test 3");
} else {
    console.log("FAIL: My Custom Case Sensitive Test 3");
    console.log("Expected:", caseSensitiveOut3);
    console.log("Received:", caseSensitiveTest3);
}

/* Provided Tests */
console.log("Provided Tests")

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}
