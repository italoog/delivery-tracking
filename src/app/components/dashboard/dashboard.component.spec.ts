import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DeliveryService } from '../../services/delivery.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Delivery } from '../../models/delivery.model';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDeliveryService: jasmine.SpyObj<DeliveryService>;

  const mockDelivery: Delivery = {
    id: '1',
    documento: 'DOC123',
    motorista: { nome: 'João' },
    cliente_origem: { nome: 'Origem', endereco: 'Rua A', bairro: 'Bairro X', cidade: 'Cidade Y' },
    cliente_destino: { nome: 'Destino', endereco: 'Rua B', bairro: 'Bairro Z', cidade: 'Cidade W' },
    status_entrega: 'ENTREGUE'
  };

  beforeEach(async () => {
    mockDeliveryService = jasmine.createSpyObj('DeliveryService', ['getDeliveries']);

    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatTableModule, NoopAnimationsModule, DashboardComponent],
      providers: [
        { provide: DeliveryService, useValue: mockDeliveryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load deliveries on init', () => {
    const mockDeliveries: Delivery[] = [mockDelivery];
    mockDeliveryService.getDeliveries.and.returnValue(of(mockDeliveries));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.deliveries).toEqual(mockDeliveries);
  });

  it('should calculate driver stats correctly', () => {
    component.deliveries = [
      { ...mockDelivery },
      { ...mockDelivery, id: '2', status_entrega: 'PENDENTE' },
      { ...mockDelivery, id: '3', motorista: { nome: 'Maria' } }
    ];

    const stats = component.getDriverStats();

    expect(stats).toEqual([
      { nome: 'João', total: 2, realizadas: 1 },
      { nome: 'Maria', total: 1, realizadas: 1 }
    ]);
  });

  it('should calculate failed deliveries correctly', () => {
    component.deliveries = [
      { ...mockDelivery, status_entrega: 'INSUCESSO' },
      { ...mockDelivery, id: '2', status_entrega: 'ENTREGUE' },
      { ...mockDelivery, id: '3', motorista: { nome: 'Maria' }, status_entrega: 'INSUCESSO' }
    ];

    const failedDeliveries = component.getFailedDeliveries();

    expect(failedDeliveries).toEqual([
      { nome: 'João', insucessos: 1 },
      { nome: 'Maria', insucessos: 1 }
    ]);
  });

  it('should calculate neighborhood stats correctly', () => {
    component.deliveries = [
      { ...mockDelivery },
      { ...mockDelivery, id: '2', status_entrega: 'PENDENTE' },
      { ...mockDelivery, id: '3', cliente_destino: { ...mockDelivery.cliente_destino, bairro: 'Bairro A' } }
    ];

    const neighborhoodStats = component.getNeighborhoodStats();

    expect(neighborhoodStats).toEqual([
      { bairro: 'Bairro Z', total: 2, realizadas: 1 },
      { bairro: 'Bairro A', total: 1, realizadas: 1 }
    ]);
  });
});