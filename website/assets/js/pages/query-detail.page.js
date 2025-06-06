parasails.registerPage('query-detail', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    contributors: [],
    selectedTab: 'sql',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    //…
  },
  mounted: async function () {

    let columnNamesForThisQuery = [];
    let tableNamesForThisQuery = [];
    if(this.columnNamesForSyntaxHighlighting){
      columnNamesForThisQuery = this.columnNamesForSyntaxHighlighting;
    }
    if(this.tableNamesForSyntaxHighlighting){
      tableNamesForThisQuery = this.tableNamesForSyntaxHighlighting;
    }
    // Sorting the arrays of keywords by length to match larger keywords first.
    columnNamesForThisQuery = columnNamesForThisQuery.sort((a,b)=>{
      return a.length < b.length ? 1 : -1;
    });
    tableNamesForThisQuery = tableNamesForThisQuery.sort((a,b)=>{
      return a.length < b.length ? 1 : -1;
    });
    (()=>{
      $('pre code').each((i, block) => {
        if(block.classList.contains('ps') || block.classList.contains('sh')){
          window.hljs.highlightElement(block);
          return;
        }
        let tableNamesToHighlight = [];// Empty array to track the keywords that we will need to highlight
        for(let tableName of tableNamesForThisQuery){// Going through the array of keywords for this table, if the entire word matches, we'll add it to the
          for(let match of block.innerHTML.match(tableName)||[]){
            tableNamesToHighlight.push(match);
          }
        }
        // Now iterate through the tableNamesToHighlight, replacing all matches in the elements innerHTML.
        let replacementHMTL = block.innerHTML;
        for(let keywordInExample of tableNamesToHighlight) {
          let regexForThisExample = new RegExp(keywordInExample, 'g');
          replacementHMTL = replacementHMTL.replace(regexForThisExample, '<span class="hljs-attr">'+_.trim(keywordInExample)+'</span>');
        }
        $(block).html(replacementHMTL);
        let columnNamesToHighlight = [];// Empty array to track the keywords that we will need to highlight
        for(let columnName of columnNamesForThisQuery){// Going through the array of keywords for this table, if the entire word matches, we'll add it to the
          for(let match of block.innerHTML.match(columnName)||[]){
            columnNamesToHighlight.push(match);
          }
        }

        for(let keywordInExample of columnNamesToHighlight) {
          let regexForThisExample = new RegExp(keywordInExample, 'g');
          replacementHMTL = replacementHMTL.replace(regexForThisExample, '<span class="hljs-string">'+_.trim(keywordInExample)+'</span>');
        }
        $(block).html(replacementHMTL);
        window.hljs.highlightElement(block);
        // After we've highlighted our keywords, we'll highlight the rest of the codeblock
        // If this example is a single-line, we'll do some basic formatting to make it more human-readable.
        if($(block)[0].innerText.match(/\n/gmi)){
          $(block).addClass('has-linebreaks');
        } else {
          $(block).addClass('no-linebreaks');
        }
      });
    })();
    $('[purpose="copy-button"]').on('click', async function() {
      let code = $(this).closest('[purpose="codeblock"]').find('pre:visible code').text();
      if(code) {
        $(this).addClass('copied');
        await setTimeout(()=>{
          $(this).removeClass('copied');
        }, 2000);
        navigator.clipboard.writeText(code);
      }
    });
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  },
});
