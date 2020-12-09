import { Component, OnInit } from '@angular/core';
import { Asq } from '../shared/proced.model';
import { Asq2 } from '../shared/verifica.model';
import Swal from 'sweetalert2';
import { ProcedService } from '../proced/proced.service';
import { VerificaService } from './verifica.service';

@Component({
  selector: 'app-verifica',
  templateUrl: './verifica.component.html'
})
export class VerificaComponent implements OnInit {
  asq: Asq[];
  asq2: Asq2[];

  selec = {
    inputidade: '',
    selectsexo: '',
    id: 0
  };

  constructor(private procedService: ProcedService,
    private verificaService: VerificaService) { }

  ngOnInit() {
    this.procedService.get().subscribe((res: Asq[]) => {
      this.asq = res;
    },
      (err) => Swal.fire({
        icon: 'error',
        title: '' + err + ' ',
        showConfirmButton: true,
      })
    );
  }

  search() {
    if (this.selec.id <= 0 || this.selec.id === null) {
      Swal.fire(
        'Problema ao verificar!',
        'Por favor selecione um código de procedimento!',
        'error'
      );
      return;
    }

    if (this.selec.inputidade === '' || this.selec.inputidade === null) {
      Swal.fire(
        'Problema ao verificar!',
        'Por favor insira uma idade para o paciente!',
        'error'
      );
      return;
    }

    if (this.selec.selectsexo === '' || this.selec.selectsexo === null) {
      Swal.fire(
        'Problema ao verificar!',
        'Por favor selecione o sexo do paciente!',
        'error'
      );
      return;
    }

    this.verificaService.search(this.selec).subscribe((res: Asq2[]) => {
      this.asq2 = res;

      for (let i = 0; i < this.asq2.length; i++) {
        if (this.asq2.length < 0) {
          Swal.fire({
            icon: 'error',
            title: 'Procedimento não permitido!',
            showConfirmButton: true,
          });
        }
        else if (this.asq2[i].idade > this.selec.inputidade) {
          Swal.fire({
            icon: 'error',
            title: 'Paciente não atende a idade mínima!',
            showConfirmButton: true,
          });
        }
        else if (this.asq2[i].sexo != this.selec.selectsexo) {
          Swal.fire({
            icon: 'error',
            title: 'Sexo do paciente incorreto!',
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Procedimento está autorizado!',
            showConfirmButton: true,
          });
        }
      }
    },
      (err) => Swal.fire({
        icon: 'error',
        title: '' + err + ' ',
        showConfirmButton: true,
      })
    );
  }
}
