package rodrigo.san.fractalapi.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Data
@Document(collection = "orders")
public class Product {
    @MongoId
    private String id;
    private String name;
    private float unitPrice;
    private int qty;
    private float totalPrice;
}
