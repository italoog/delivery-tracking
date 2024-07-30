import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.model';

interface DriverStats {
  [key: string]: { total: number; realizadas: number };
}

interface FailedDeliveries {
  [key: string]: number;
}

interface NeighborhoodStats {
  [key: string]: { total: number; realizadas: number };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {
    this.deliveryService.getDeliveries().subscribe(
      deliveries => {
        this.deliveries = deliveries;
        console.log('Deliveries loaded:', this.deliveries);
      },
      error => console.error('Error loading deliveries:', error)
    );
  }

  getDriverStats() {
    if (this.deliveries.length === 0) return [];

    const stats: DriverStats = {};
    this.deliveries.forEach(delivery => {
      const driverName = delivery.motorista.nome;
      if (!stats[driverName]) {
        stats[driverName] = { total: 0, realizadas: 0 };
      }
      stats[driverName].total++;
      if (delivery.status_entrega === 'ENTREGUE') {
        stats[driverName].realizadas++;
      }
    });
    return Object.entries(stats).map(([nome, data]) => ({
      nome,
      total: data.total,
      realizadas: data.realizadas
    }));
  }

  getFailedDeliveries() {
    if (this.deliveries.length === 0) return [];
    const stats: FailedDeliveries = {};
    this.deliveries.forEach(delivery => {
      if (delivery.status_entrega === 'INSUCESSO') {
        const driverName = delivery.motorista.nome;
        if (!stats[driverName]) {
          stats[driverName] = 0;
        }
        stats[driverName]++;
      }
    });
    return Object.entries(stats).map(([nome, insucessos]) => ({
      nome,
      insucessos
    }));
  }

  getNeighborhoodStats() {
    if (this.deliveries.length === 0) return [];
    const stats: NeighborhoodStats = {};
    this.deliveries.forEach(delivery => {
      const bairro = delivery.cliente_destino.bairro;
      if (!stats[bairro]) {
        stats[bairro] = { total: 0, realizadas: 0 };
      }
      stats[bairro].total++;
      if (delivery.status_entrega === 'ENTREGUE') {
        stats[bairro].realizadas++;
      }
    });
    return Object.entries(stats).map(([bairro, data]) => ({
      bairro,
      total: data.total,
      realizadas: data.realizadas
    }));
  }
}