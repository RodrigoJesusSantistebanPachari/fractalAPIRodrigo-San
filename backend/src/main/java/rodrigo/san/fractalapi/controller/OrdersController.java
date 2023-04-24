package rodrigo.san.fractalapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rodrigo.san.fractalapi.model.Order;
import rodrigo.san.fractalapi.model.Product;
import rodrigo.san.fractalapi.repo.OrdersRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static java.util.UUID.randomUUID;


@CrossOrigin
@RestController
@RequestMapping("/orders")
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

        System.out.println(order.getOrderNr());

        //Set current date
        ZoneId zoneId = ZoneId.of("America/Lima");
        ZonedDateTime zdt = ZonedDateTime.now(zoneId);
        Date date = Date.from(zdt.toInstant());

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


    @PutMapping("{id}/product")
    Order createProduct(@PathVariable String id, @RequestBody Product product) {

        System.out.println(product.getName());

        Order orderFromDb = ordersRepository.findById(id).orElseThrow(RuntimeException::new);
        //Refresh to current date

        ZoneId zoneId = ZoneId.of("America/Lima");
        ZonedDateTime zdt = ZonedDateTime.now(zoneId);
        Date date = Date.from(zdt.toInstant());

        orderFromDb.setDate(date);

        //Set id of the product
        product.setId(randomUUID().toString());
        //Set Total Price of product
        product.setTotalPrice(product.getQty() * product.getUnitPrice());
        //Set new product
        orderFromDb.addProduct(product);

        return ordersRepository.save(orderFromDb);
    }

    @PutMapping("{id}")
    Order updateProduct(@PathVariable String id, @RequestBody Order order) {
        System.out.println("111111111111");
        Order orderFromDb = ordersRepository.findById(id).orElseThrow(RuntimeException::new);
        System.out.println("Pasó y encontró");
        //Refresh to current date

        ZoneId zoneId = ZoneId.of("America/Lima");
        ZonedDateTime zdt = ZonedDateTime.now(zoneId);
        Date date = Date.from(zdt.toInstant());

        orderFromDb.setDate(date);

        //Set new data
        orderFromDb.setOrderNr(order.getOrderNr());

        return ordersRepository.save(orderFromDb);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete(@PathVariable String id){
        Order order = ordersRepository.findById(id).orElseThrow(RuntimeException::new);
        ordersRepository.delete(order);
    }

}
