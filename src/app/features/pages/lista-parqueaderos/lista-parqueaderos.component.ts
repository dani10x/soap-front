import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { SoapService } from '../../services/soap-services.service';
import * as convert from 'xml-js';
import {MatTreeModule} from '@angular/material/tree';
import { ArbolXmlComponent } from '../../components/arbol-xml/arbol-xml.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-parqueaderos',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatTreeModule, ArbolXmlComponent, CommonModule],
  templateUrl: './lista-parqueaderos.component.html',
  styleUrl: './lista-parqueaderos.component.css'
})


export class ListaParqueaderosComponent implements OnInit {

  xmlTreeData: any; //Usar este para la tabla
  dataSource!: MatTableDataSource<any>; // DataSource para la tabla
  xml!: string;
  displayedColumns: string[] = ['nombre', 'direccion', 'capacidad', 'administrador', 'ciudad', 'porcentajeCapacidad'];

  totalCapacidad: number = 0; // Para almacenar la suma de la capacidad

  constructor(private soap: SoapService) {}

  ngOnInit(): void {
    this.soap.consultarParqueaderos().subscribe({
      next: (res) => {
        this.xml = res as string;
        this.mostrarArbol(res)
      },
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
    console.log("Resultado de xml2js:", JSON.stringify(this.xmlTreeData, null, 2));

    // Acceder a los datos de los parqueaderos
  const parqueaderos = this.xmlTreeData['SOAP-ENV:Envelope']?.['SOAP-ENV:Body']?.['ns2:getAllParqueaderosResponse']?.['ns2:parqueadero'] || [];

  // Mapear los datos para extraer solo los valores de texto
  this.xmlTreeData = parqueaderos.map((item: any) => ({
    id: item['ns2:id']?._text || '',
    nombre: item['ns2:nombre']?._text || '',
    //capacidad: item['ns2:capacidad']?._text || '',
    capacidad: Number(item['ns2:capacidad']?._text || 0), // Convertir capacidad a número
    direccion: item['ns2:direccion']?._text || '',
    administrador: item['ns2:administrador']?._text || '',
    ciudad: item['ns2:ciudad']?._text || '',
  }));

  // Calcular el total de la capacidad
  this.totalCapacidad = this.xmlTreeData.reduce((sum:number, item: any) => sum + item.capacidad, 0);
  console.log("Total de capacidad:", this.totalCapacidad);

  // Agregar el porcentaje de capacidad para cada parqueadero
  this.xmlTreeData = this.xmlTreeData.map((item:any) => ({
    ...item,
    porcentajeCapacidad: ((item.capacidad / this.totalCapacidad) * 100).toFixed(2) + '%' // Calcula y redondea el porcentaje
  }));

  // Asignar los datos mapeados al dataSource
  this.dataSource = new MatTableDataSource(this.xmlTreeData);
  
}


}
