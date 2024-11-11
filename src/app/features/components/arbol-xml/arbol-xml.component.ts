import { Component, Input, OnInit } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import { XmlNode } from '../../models/node.model';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-arbol-xml',
  standalone: true,
  imports: [MatTreeModule, MatIconModule],
  templateUrl: './arbol-xml.component.html',
  styleUrl: './arbol-xml.component.css'
})
export class ArbolXmlComponent implements OnInit {

  @Input() xmlData: any;
  dataSource: XmlNode[] = [];

  ngOnInit(): void {
    const data = this.parseXmlStringToXmlNode(this.xmlData);
    if(data) {
      this.dataSource.push(data);
    }
  }

  childrenAccessor = (node: XmlNode) => node.children ?? [];

  hasChild = (_: number, node: XmlNode) => !!node.children && node.children.length > 0;

  private parseXmlStringToXmlNode(xmlString: string): XmlNode | null {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const rootNode = xmlDoc.documentElement;

    if (rootNode.nodeName === "parsererror") {
      console.error("Error parsing XML string");
      return null;
    }

    return this.xmlNodeFromElement(rootNode);
  }

  private xmlNodeFromElement(element: Element): XmlNode {
    const node: XmlNode = {
      name: element.nodeName,
      value: element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE
        ? element.textContent || undefined
        : undefined,
      children: []
    };

    for (const child of Array.from(element.children)) {
      node.children!.push(this.xmlNodeFromElement(child));
    }

    // If there are no child elements, remove the empty children array
    if (node.children && node.children.length === 0) {
      delete node.children;
    }

    return node;
  }

}
