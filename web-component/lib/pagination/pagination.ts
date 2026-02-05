import { renderHTML } from './render';
import CSS from './style.css';
import { registerDefaultVariables } from 'jb-core/theme';
import type { JBPaginationElements, PageIndexDom } from './types';
import { i18n } from "jb-core/i18n";
import {enToFaDigits} from 'jb-core';
export class JBPaginationWebComponent extends HTMLElement {
  #elements: JBPaginationElements;
  #pageIndex: number = 1;
  #min = 1;
  #max = Infinity;
  //how many number in display
  #DisplayIndexCount = 3;
  showPersianNumber = i18n.locale.numberingSystem == "arabext";

  //how many number item we have in dom
  get #indexButtonCount (){
    return this.#DisplayIndexCount + 2; /* for 2 hidden button in start and end of the list */
  }
  get pageIndex(){
    return this.#pageIndex;
  }
  set pageIndex(value:number){
    this.#goToPage(value,false);
  }
  get max() {
    return this.#max;
  }
  set max(value: number) {
    this.#max = value;
    if (this.pageIndex > value) {
      this.#updatePageIndex(value,false);
    }
    this.#elements.nav.last.disabled = this.#max == Infinity;
  }
  get min() {
    return this.#min;
  }
  set min(value: number) {
    this.#min = value;
    if (this.#pageIndex < value) {
      this.#updatePageIndex(value, false);
    }
    this.#elements.nav.first.disabled = this.#min == Infinity;
  }
  constructor() {
    super();
    this.#init();
  }
  #init() {
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    registerDefaultVariables();
    this.#render();
    this.#elements = {
      nav: {
        wrapper: this.shadowRoot.querySelector('.page-navigator') as HTMLDivElement,
        first: this.shadowRoot.querySelector('.first-page') as HTMLButtonElement,
        last: this.shadowRoot.querySelector('.last-page') as HTMLButtonElement,
        next: this.shadowRoot.querySelector('.next-page') as HTMLButtonElement,
        prev: this.shadowRoot.querySelector('.prev-page') as HTMLButtonElement,
      },
      index: {
        wrapper: this.shadowRoot.querySelector('.page-index-wrapper') as HTMLDivElement,
        list: []
      }
    }
    this.#registerEventListener();
    //TODO: do it after pageSize determined
    this.#initPageIndexes();
    // To retrigger setter effects
    this.max = Infinity;
    this.min = 1;
  }
  #render() {
    const html = `<style>${CSS}</style>\n${renderHTML()}`;
    const element = document.createElement("template");
    element.innerHTML = html;
    this.shadowRoot!.appendChild(element.content.cloneNode(true));
  }
  connectedCallback() {
  }
  #registerEventListener() {
    this.#elements.nav.next.addEventListener('click', this.#goToNextPage.bind(this));
    this.#elements.nav.prev.addEventListener('click', this.#goToPrevPage.bind(this));
    this.#elements.nav.last.addEventListener('click', ()=>{this.#goToPage(this.#max,true)});
    this.#elements.nav.first.addEventListener('click', ()=>{this.#goToPage(this.#min,true)});
  }

  #goToNextPage(shouldDispatch:boolean) {
    if (this.#pageIndex > this.#max - 1) {
      return;
    }
    const newIndex = this.#pageIndex + 1
    const indexDom = this.#createPageIndexElement(newIndex + 2)
    this.#elements.index.list.shift()?.remove();
    this.#elements.index.wrapper.append(indexDom);
    this.#elements.index.list.push(indexDom);
    this.#updatePageIndex(newIndex, shouldDispatch)
  }
  #goToPrevPage(shouldDispatch:boolean) {
    if (this.#pageIndex < this.#min + 1) {
      return;
    }
    const newIndex = this.#pageIndex - 1
    const indexDom = this.#createPageIndexElement(newIndex - 2)
    this.#elements.index.list.pop()?.remove();
    this.#elements.index.list.unshift(indexDom);
    this.#elements.index.wrapper.prepend(indexDom);
    this.#updatePageIndex(newIndex,shouldDispatch)
  }
  #goToPage(newPageIndex: number,shouldDispatch:boolean) {
    if(this.#pageIndex == newPageIndex){
      return;
    }
    const diff = newPageIndex - this.#pageIndex;
    if(Math.abs(diff)>1){
      this.#updatePageIndex(newPageIndex,shouldDispatch);
      this.#initPageIndexes();
    }else{
      //play with animation
      diff>0?this.#goToNextPage(shouldDispatch):this.#goToPrevPage(shouldDispatch);
    }
  }
  /**
   * place pageIndex element in position in data and dom structure
   */
  #putPageIndexElement(element: PageIndexDom) {
    if(this.#elements.index.list.find(x=>x.pageIndex == element.pageIndex)){
      //already exist
      return;
    }
    let removePosition:'end'|'start' = 'end';
    if (this.#elements.index.list.length == 0  || this.#elements.index.list[this.#elements.index.list.length - 1]?.pageIndex < element.pageIndex) {
      //put in last
      this.#elements.index.list.push(element);
      this.#elements.index.wrapper.append(element);
      //remove first item to keep array in size
      removePosition = 'start';
    } else if (this.#elements.index.list[0]?.pageIndex > element.pageIndex) {
      // put in first
      this.#elements.index.list.unshift(element)
      this.#elements.index.wrapper.prepend(element);
    } else {
      // in rare situation when element in the middle of the list
      const index = this.#elements.index.list.findIndex((x) => x?.pageIndex > element.pageIndex);
      this.#elements.index.wrapper.insertBefore(element, this.#elements.index.list[index]);
      this.#elements.index.list.splice(index, 0, element);
    }
    if(this.#elements.index.list.length>this.#indexButtonCount){
      //remove redundant elements 
      removePosition == 'end'?this.#elements.index.list.pop().remove():this.#elements.index.list.shift().remove();
    }
  }
  #createPageIndexElement(newIndex: number): PageIndexDom {
    //when we are out of bound we create empty page index
    const isEmpty = this.#min > newIndex || this.#max < newIndex;
    const elem = document.createElement('div') as PageIndexDom;
    elem.classList.add('page-index', isEmpty ? 'empty' : undefined);
    elem.dataset.index = `${newIndex}`;
    elem.pageIndex = newIndex;
    elem.addEventListener("click", (e) => {
      this.#onPageIndexClick(elem);
    });
    if (isEmpty) {
      elem.isEmpty = true;
    } else {
      elem.isEmpty = false;
      elem.innerHTML = `${this.showPersianNumber?enToFaDigits(newIndex):newIndex}`;
    }
    return elem;
  }
  #onPageIndexClick(item: PageIndexDom) {
    if (item.isEmpty) {
      return;
    }
    this.#goToPage(item.pageIndex,true);
  }
  /**
   * this event must call when we update pageindex inside of component by user interaction and not programmer
   */
  #updatePageIndex(newIndex: number,shouldDispatch:boolean) {
    this.#pageIndex = newIndex;
    this.#updateActiveIndex(newIndex);
    shouldDispatch && this.#dispatchChangeEvent();
  }
  #updateActiveIndex(newIndex: number) {
    this.#elements.index.wrapper.querySelector(".current")?.classList.remove('current');
    this.#elements.index.list.forEach(x => {
      if (x.pageIndex == newIndex) {
        x.classList.add('current')
      }
    })
  }
  #dispatchChangeEvent() {
    const event = new Event('change', { cancelable: false, composed: true, bubbles: true })
    this.dispatchEvent(event);
  }
  #initPageIndexes() {
    this.#putPageIndexElement(this.#createPageIndexElement(this.#pageIndex - 2));
    this.#putPageIndexElement(this.#createPageIndexElement(this.#pageIndex - 1));
    this.#putPageIndexElement(this.#createPageIndexElement(this.#pageIndex));
    this.#putPageIndexElement(this.#createPageIndexElement(this.#pageIndex + 1));
    this.#putPageIndexElement(this.#createPageIndexElement(this.#pageIndex + 2));
    this.#updateActiveIndex(this.#pageIndex);
  }
}

const myElementNotExists = !customElements.get('jb-pagination');
if (myElementNotExists) {
  window.customElements.define('jb-pagination', JBPaginationWebComponent);
}