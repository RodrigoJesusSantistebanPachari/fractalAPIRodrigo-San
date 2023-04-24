package rodrigo.san.fractalapi.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import rodrigo.san.fractalapi.model.Order;

import java.util.List;

public interface OrdersRepository extends MongoRepository<Order, String> {
    @Query("{ 'status' : 0 }")
    List<Order> findPendingOrders();

    @Query("{ 'status' : 1 }")
    List<Order> findInProgressOrders();

    @Query("{ 'status' : 2 }")
    List<Order> findCompletedOrders();

}
