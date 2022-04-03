import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService{
  createDb() {
      const categories: Category[] = [
          { id: 1, name: 'Lazer', description: 'Cinema, Praia, Parque, etc' },
          { id: 2, name: 'Saúde', description: 'Plano de Saúde, Consultas, Exames' },
          { id: 3, name: 'Moradia', description: 'Aluguel, IPTU' },
          { id: 4, name: 'Salário', description: 'Salário Empresarial' },
          { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' },
      ];

      return { categories };
  }
}
