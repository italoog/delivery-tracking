import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.model';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  deliveries: Delivery[] = [];
  filteredDeliveries: Delivery[] = [];
  pagedDeliveries: Delivery[] = [];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  currentPage = 0;
  totalDeliveries = 0;

  selectedDriver = '';
  selectedStatus = '';

  displayedColumns: string[] = ['id', 'documento', 'motorista', 'cliente_origem', 'cliente_destino', 'status_entrega'];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.deliveryService.getDeliveries().subscribe(
      deliveries => {
        this.deliveries = deliveries;
        this.applyFilter();
      },
      error => {
        console.error('Erro ao carregar entregas:', error);
      }
    );
  }

  applyFilter() {
    if (this.selectedDriver === '' && this.selectedStatus === '') {
      this.filteredDeliveries = this.deliveries;
    } else {
      this.filteredDeliveries = this.deliveries.filter(delivery =>
        (this.selectedDriver === '' || delivery.motorista.nome === this.selectedDriver) &&
        (this.selectedStatus === '' || delivery.status_entrega === this.selectedStatus)
      );
    }
    this.totalDeliveries = this.filteredDeliveries.length;
    this.currentPage = 0;
    this.updatePagedDeliveries();
  }

  updatePagedDeliveries() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedDeliveries = this.filteredDeliveries.slice(startIndex, startIndex + this.pageSize);
    console.log('Updated paged deliveries:', this.pagedDeliveries);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedDeliveries();
  }

  getDrivers(): string[] {
    return [...new Set(this.deliveries.map(d => d.motorista.nome))];
  }

  getStatuses(): string[] {
    return [...new Set(this.deliveries.map(d => d.status_entrega))];
  }
}