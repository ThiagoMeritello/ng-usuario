import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  providers: [DatePipe]
})
export class ListarComponent implements OnInit {

  public usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.obterTodos()
    .subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.log(error));
  }

  TipoEscolaridade(codigo: number): string {
    if (codigo === 1)
      return "Infantil";
    else if (codigo === 2)
      return "Fundamental";
    else if (codigo === 3)
      return "Médio";
    else if (codigo === 4)
      return "Superior";
  }

}
