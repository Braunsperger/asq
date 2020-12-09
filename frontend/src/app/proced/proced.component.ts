import { Component, OnInit, ViewChild } from '@angular/core';
import { Asq } from '../shared/proced.model';
import { ProcedService } from './proced.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-proced',
  templateUrl: './proced.component.html',
  styleUrls: ['./proced.component.css']
})

export class ProcedComponent implements OnInit{
  displayedColumns: string[] = ['procedimento', 'idade', 'sexo', 'permitido', 'acoes'];
  dataSource = new MatTableDataSource();

  @ViewChild('modalEditar', { static: false }) public modalEditar: ModalDirective;
  @ViewChild('modalIncluir', { static: false }) public modalIncluir: ModalDirective;

  asq: Asq[];
  asq1 = new Asq;

  constructor(private procedService: ProcedService) { }

  ngOnInit() {
    this.procedService.get().subscribe((res: Asq[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.asq = res;
    },
      (err) => Swal.fire({
        icon: 'error',
        title: '' + err + ' ',
        showConfirmButton: true,
      })
    );
  }

  add(f, codproc, idade, sexo, perm) {
    if (codproc <= 0 || codproc === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor informar ou preencher um código de procedimento válido!',
        'error'
      );
      return;
    }

    if (idade <= 0 || idade === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor informar ou preencher uma idade válida!',
        'error'
      );
      return;
    }

    if (sexo < 0 || sexo === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor informar o sexo para o procedimento!',
        'error'
      );
      return;
    }

    if (perm < 0 || perm === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor informar se o procedimento é válido ou não!',
        'error'
      );
      return;
    }

    this.procedService.store(this.asq1).subscribe((res: Asq[]) => {
      this.dataSource = new MatTableDataSource(res);
      Swal.fire({
        icon: 'success',
        title: 'Novo procedimento adicionado com sucesso!',
        showConfirmButton: true,
      });
      f.reset();
      this.ngOnInit();
    },
      (err) => Swal.fire({
        icon: 'error',
        title: '' + err + ' ',
        showConfirmButton: false,
      })
    );
  }

  update(codproc, idade, sexo, perm, id) {
    if (codproc <= 0 || codproc === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor atualizar para um código de procedimento válido!',
        'error'
      );
      return;
    }

    if (idade <= 0 || idade === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor atualizar para uma idade válida!',
        'error'
      );
      return;
    }

    if (sexo < 0 || sexo === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor atualizar para um sexo para o procedimento!',
        'error'
      );
      return;
    }

    if (perm < 0 || perm === null) {
      Swal.fire(
        'Problema ao adicionar!',
        'Favor atualizar se o procedimento é válido ou não!',
        'error'
      );
      return;
    }

    this.procedService.update({codproc, idade, sexo, perm, id}).subscribe((res) => {
      this.asq = res;
      Swal.fire({
        icon: 'success',
        title: 'Procedimento atualizado com sucesso!',
        showConfirmButton: true,
      });
      this.ngOnInit();
    },
      (err) => Swal.fire({
        icon: 'error',
        title: '' + err + ' ',
        showConfirmButton: false,
      })
    );
  }

  del(id) {
    this.procedService.delete(+id).subscribe((res: Asq[]) => {
      this.dataSource = new MatTableDataSource(res);
      Swal.fire({
        icon: 'success',
        title: 'Procedimento deletado com sucesso!',
        showConfirmButton: true,
      });
    },
      (err) => Swal.fire({
        icon: 'error',
        title: '' + err + ' ',
        showConfirmButton: true,
      })
    );
  }

  abrirModalEditar(): void {
    this.modalEditar.show();
  }

  abrirModalIncluir(): void {
    this.modalIncluir.show();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}