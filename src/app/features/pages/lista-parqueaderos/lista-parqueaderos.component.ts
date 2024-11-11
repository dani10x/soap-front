import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { SoapService } from '../../services/soap-services.service';
import * as convert from 'xml-js';
import {MatTreeModule} from '@angular/material/tree';

@Component({
  selector: 'app-lista-parqueaderos',
  standalone: true,
  imports: [MatCardModule, MatTreeModule],
  templateUrl: './lista-parqueaderos.component.html',
  styleUrl: './lista-parqueaderos.component.css'
})
export class ListaParqueaderosComponent implements OnInit {

  xmlTreeData: any;

  constructor(private soap: SoapService) {}

  ngOnInit(): void {
    this.soap.consultarParqueaderos().subscribe({
      next: (res) => this.mostrarArbol(res),
      error: (e) => console.error(e),
    });
  }

  private mostrarArbol(xml: string): void {
    this.xmlTreeData = convert.xml2js(xml,
      {
       compact: true,
       trim: true,
       alwaysChildren: true,
       ignoreInstruction: true,
       ignoreDeclaration: true,
       ignoreAttributes: true,
       ignoreComment: true,
       ignoreCdata: true,
       ignoreDoctype: true,
      });
    console.log(this.xmlTreeData);
  }

}
