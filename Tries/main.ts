import {SearchArticles} from './SearchArticles';
import * as readline from 'readline-Sync';
import * as fs from 'fs';
/**
 * 
 * code structure:
 * main.ts includes functions interacting with users.
 * SearchArticles.ts create trie structure with `company.dat`, and 
 * search keywords in a given article.
 * Tries.ts and TrieNode.ts are the structure of trie.
 * 
 */
/**
 * 
 * @param def 
 * 
 */
//interact with users
function prompt_user_for_input(def:string): string {
	let filename: string = readline.question(">> ");
	if (filename === 'default') {
			return def;
		}
		if (fs.existsSync(filename)) {
			console.log(filename + " is found.");
			return filename;
		}
		else {
			console.log("file is not found. Please try again.");
			console.log("You can also type 'default' to get the default file we prepare for you.")
			return this.prompt_user_for_input(def);
		}
    }
/**
 * 
 * @param num 
 */
function repeat_padding_space(num:number): string {
	let space = ' ';
	for(let i = 1; i < num; i++){
		space = space + ' ';
	}
	return space;
	}
/**
 * 
 * @param searched_result 
 */
function output(searched_result: SearchArticles){
    //print each compnay name , hit count, relevance
    let NAME = 'Company';
    let HIT = 'Hit Count';
    let RELEVANCE = 'Relevance';
    let TOTAL_COUNT:number = searched_result.total_count;
    let MAX_NAME_LENGTH = searched_result.maximum_name_length;
    //print title;
    console.log(NAME + repeat_padding_space(MAX_NAME_LENGTH - NAME.length) + 
                HIT + repeat_padding_space(8) + RELEVANCE);
    let total_hits: number = 0;
    for (let key in searched_result.primary_name_hashmap) {
        let name: string = key;
        let hit: number = searched_result.primary_name_hashmap[key];
        total_hits += hit;
        
        let relevance: any = ((hit/TOTAL_COUNT) * 100);
        let digits = Math.round(relevance).toString().length;
        relevance = relevance.toFixed(4 - digits).toString() + '%';
        console.log(name + repeat_padding_space(MAX_NAME_LENGTH - name.length + 3) +
        hit + repeat_padding_space(14 - hit.toString().length + 1) +
        relevance);
    }
    let TOTAL_HITS = 'Total';
    let front_padding: string = repeat_padding_space(Math.round((MAX_NAME_LENGTH - TOTAL_HITS.length)/2));
    let total_relevance: any = ((total_hits/TOTAL_COUNT) * 100);
    let digits = Math.round(total_relevance).toString().length;
    total_relevance = total_relevance.toFixed(4 - digits).toString() + '%';
    console.log(front_padding + TOTAL_HITS + 
        repeat_padding_space(MAX_NAME_LENGTH - TOTAL_HITS.length + 3 - front_padding.length) +
        total_hits + repeat_padding_space(14 - total_hits.toString().length + 1) + total_relevance);
    let TOTAL_WORDS = 'Total Words';
    console.log(front_padding + TOTAL_WORDS + front_padding + '  ' + TOTAL_COUNT);


}

/**
 * 
 * @param company_file 
 */
function main(company_file) {
    let tries: SearchArticles = new SearchArticles();
    tries.create_tries('', company_file);
	console.log("search company names in article.");
	console.log("Please give me an article.");
	console.log("You can type in the format of 'directory/filename', such as 'files/article1.txt'");
	console.log("or just the filename if it is in current working directory.");
	let default_input_filename: string = 'files/article1.txt';
	let input_filename: string = prompt_user_for_input(default_input_filename);
    console.log("read in ...")
    tries.create_tries('', company_file);
    tries.search_article(input_filename);
    //console.log("primary name, ",tries.primary_name_hashmap);
    //console.log("total count", tries.total_count);
    //console.log("Nvidia", tries.tries.exists('Nvidia'));
    output(tries);
    }

main('company.dat');
