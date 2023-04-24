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
import java.util.Objects;
import java.util.UUID;

import static java.util.UUID.randomUUID;


@CrossOrigin
@RestController
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private OrdersRepository ordersRepository;

    //Get all Orders
    @GetMapping("")
    List<Order> index() {
        return ordersRepository.findAll();
    }

    //Get pending orders
    @GetMapping("/pending")
    List<Order> pendingOrders() {
        return ordersRepository.findPendingOrders();
    }

    //Get in progress orders
    @GetMapping("/inprogress")
    List<Order> inProgressOrders() {
        return ordersRepository.findInProgressOrders();
    }

    //Get completed orders
    @GetMapping("/completed")
    List<Order> completedOrders() {
        return ordersRepository.findCompletedOrders();
    }

    //Create order
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Order create(@RequestBody Order order) {

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

        //Count of selected products
        if (orderFromDb.getProducts() != null) {
            orderFromDb.setNProducts(orderFromDb.getProducts().size());
        } else {
            orderFromDb.setNProducts(0);
        }

        //Complete the final price with products' prices
        float finalPrice = 0;
        if (orderFromDb.getProducts() != null) {
            for (Product p : orderFromDb.getProducts()) {
                finalPrice += p.getTotalPrice();
            }
        }
        orderFromDb.setFinalPrice(finalPrice);

        return ordersRepository.save(orderFromDb);
    }

    @PutMapping("{id}")
    Order updateProduct(@PathVariable String id, @RequestBody Order order) {

        Order orderFromDb = ordersRepository.findById(id).orElseThrow(RuntimeException::new);

        //Refresh to current date
        ZoneId zoneId = ZoneId.of("America/Lima");
        ZonedDateTime zdt = ZonedDateTime.now(zoneId);
        Date date = Date.from(zdt.toInstant());

        orderFromDb.setDate(date);

        //Set new data
        orderFromDb.setOrderNr(order.getOrderNr());
        orderFromDb.setStatus(order.getStatus());

        return ordersRepository.save(orderFromDb);
    }

    @DeleteMapping("{id}/product/{idProduct}")
    Order deleteProduct(@PathVariable String id, @PathVariable String idProduct) {
        Order orderFromDb = ordersRepository.findById(id).orElseThrow(RuntimeException::new);
        List<Product> productsAux = orderFromDb.getProducts();

        for(Product p : productsAux){
            if (Objects.equals(p.getId(), idProduct)){
                productsAux.remove(p);
                break;
            }
        }

        orderFromDb.setProducts(productsAux);

        //Count of selected products
        if (orderFromDb.getProducts() != null) {
            orderFromDb.setNProducts(orderFromDb.getProducts().size());
        } else {
            orderFromDb.setNProducts(0);
        }

        //Complete the final price with products' prices
        float finalPrice = 0;
        if (orderFromDb.getProducts() != null) {
            for (Product p : orderFromDb.getProducts()) {
                finalPrice += p.getTotalPrice();
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
