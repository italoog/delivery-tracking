import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeliveryService } from './delivery.service';
import { Delivery } from '../models/delivery.model';

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliveryService]
    });

    service = TestBed.inject(DeliveryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve deliveries from the API', () => {
    const mockDeliveries: Delivery[] = [
      {
        id: '1',
        documento: 'DOC123',
        motorista: { nome: 'João' },
        cliente_origem: { nome: 'Origem', endereco: 'Rua A', bairro: 'Bairro X', cidade: 'Cidade Y' },
        cliente_destino: { nome: 'Destino', endereco: 'Rua B', bairro: 'Bairro Z', cidade: 'Cidade W' },
        status_entrega: 'ENTREGUE'
      }
    ];

    service.getDeliveries().subscribe(deliveries => {
      expect(deliveries.length).toBe(1);
      expect(deliveries).toEqual(mockDeliveries);
    });

    const req = httpMock.expectOne('https://raw.githubusercontent.com/brunochikuji/example/main/entregas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockDeliveries);
  });
});