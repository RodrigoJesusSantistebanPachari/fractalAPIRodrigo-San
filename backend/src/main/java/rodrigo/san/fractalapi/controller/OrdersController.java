package rodrigo.san.fractalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rodrigo.san.fractalapi.model.Order;
import rodrigo.san.fractalapi.model.Product;
import rodrigo.san.fractalapi.repo.OrdersRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("")
public class OrdersController {
    @Autowired
    private OrdersRepository ordersRepository;

    @GetMapping("")
    List<Order> index() {
        return ordersRepository.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Order create(@RequestBody Order order) {

        //Set current date
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        dateFormat.format(date);
        order.setDate(date);

        //Count of selected products
        if (order.getProducts() != null) {
            order.setNProducts(order.getProducts().size());
        } else {
            order.setNProducts(0);
        }

        //Complete the final price with products' prices
        float finalPrice = 0;
        if (order.getProducts() != null) {
            for (Product product : order.getProducts()) {
                finalPrice += product.getTotalPrice();
            }
        }
        order.setFinalPrice(finalPrice);

        return ordersRepository.save(order);
    }


    @PutMapping("{id}")
    Order update(@PathVariable String id, @RequestBody Order order) {
        Order orderFromDb = ordersRepository.findById(id).orElseThrow(RuntimeException::new);

        //Refresh to current date
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        dateFormat.format(date);
        orderFromDb.setDate(date);

        //Set new data
        orderFromDb.setOrderNr(order.getOrderNr());
        orderFromDb.setProducts(order.getProducts());

        //Count of selected products
        if (order.getProducts() != null) {
            orderFromDb.setNProducts(order.getProducts().size());
        } else {
            order.setNProducts(0);
        }

        //Complete the final price with products' prices
        float finalPrice = 0;
        if (order.getProducts() != null) {
            for (Product product : order.getProducts()) {
                finalPrice += product.getTotalPrice();
            }
        }
        orderFromDb.setFinalPrice(finalPrice);

        return ordersRepository.save(orderFromDb);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){
        Order order = ordersRepository.findById(id).orElseThrow(RuntimeException::new);
        ordersRepository.delete(order);
    }

}
