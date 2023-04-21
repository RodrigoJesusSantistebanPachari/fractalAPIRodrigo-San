package rodrigo.san.fractalapi.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import rodrigo.san.fractalapi.model.Order;

public interface OrdersRepository extends MongoRepository<Order, String> {
}
