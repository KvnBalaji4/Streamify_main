package com.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Map;

@Service
public class RecaptchaService {

    @Value("${RECAPTCHA_SECRET}")
    private String recaptchaSecret; // set as env var or application.properties

    private static final String VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    public boolean verify(String token) {
        if (token == null || token.isEmpty()) {
            return false;
        }

        RestTemplate rest = new RestTemplate();
        String url = VERIFY_URL + "?secret=" + recaptchaSecret + "&response=" + token;

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> resp = rest.postForObject(url, null, Map.class);
            if (resp == null) return false;
            Boolean success = (Boolean) resp.get("success");
            // you can also inspect "score" and "action" for reCAPTCHA v3 or advanced checks
            return success != null && success;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
