package com.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UsersManager UM;

    @Autowired
    private RecaptchaService recaptchaService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users u) {
        return ResponseEntity.ok(UM.addUser(u));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String recaptchaToken = body.get("recaptchaToken");

        // ✅ Step 1: Verify reCAPTCHA
        boolean captchaVerified = recaptchaService.verify(recaptchaToken);
        if (!captchaVerified) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("status", 400, "message", "reCAPTCHA verification failed"));
        }

        // ✅ Step 2: Validate credentials
        Map<String, Object> result = UM.validateCredentials(username, password);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/getfullname")
    public ResponseEntity<?> getFullname(@RequestBody Map<String, String> data) {
        return ResponseEntity.ok(UM.getFullname(data.get("csrid")));
    }

    @PostMapping("/addAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody Users u) {
        u.setRole(1);
        return ResponseEntity.ok(UM.addUser(u));
    }

    @GetMapping("/users/search")
    public ResponseEntity<?> getUsersByEmail(@RequestParam(required = false) String email) {
        return ResponseEntity.ok(UM.searchUsers(email));
    }

    @DeleteMapping("/users/deleteByUsername")
    public ResponseEntity<?> deleteUserByUsername(@RequestParam String username) {
        return ResponseEntity.ok(UM.deleteUserByUsername(username));
    }
}
