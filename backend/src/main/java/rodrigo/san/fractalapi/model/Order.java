package rodrigo.san.fractalapi.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String OrderNr;
    private Date date;
    private int nProducts;
    private List<Product> products;
    private float finalPrice;
}
