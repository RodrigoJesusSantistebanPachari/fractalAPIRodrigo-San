package rodrigo.san.fractalapi.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.time.ZonedDateTime;
import java.util.ArrayList;
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
    private List<Product> products = new ArrayList<>();
    private float finalPrice;
    private int status = 0;

    public void addProduct(Product product) {
        products.add(product);
    }
}
