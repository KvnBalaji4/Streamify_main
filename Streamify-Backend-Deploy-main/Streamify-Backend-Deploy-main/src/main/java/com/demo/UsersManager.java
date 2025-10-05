package com.demo;

import com.demo.watchlist.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UsersManager {

    @Autowired
    JWTManager JWT;

    @Autowired
    UsersRepository UR;

    @Autowired
    WatchlistRepository watchlistRepo;

    @Autowired
    RecaptchaService recaptchaService; // Added for reCAPTCHA verification

    // ------------------- User Registration -------------------
    public Map<String, Object> addUser(Users u) {
        Map<String, Object> response = new HashMap<>();
        if (UR.validateEmail(u.getEmail()) > 0) {
            response.put("status", 401);
            response.put("message", "Email already exists");
            return response;
        }
        UR.save(u);
        response.put("status", 200);
        response.put("message", "User Registration Successful");
        return response;
    }

    // ------------------- Login without reCAPTCHA -------------------
    public Map<String, Object> validateCredentials(String username, String password) {
        Map<String, Object> response = new HashMap<>();
        if (UR.validateCredentials(username, password) > 0) {
            String token = JWT.generateToken(username);
            Users user = UR.findByUsername(username);

            response.put("status", 200);
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("username", username);
            response.put("email", user.getEmail());
        } else {
            response.put("status", 401);
            response.put("message", "Invalid Credentials");
        }
        return response;
    }

    // ------------------- Login WITH reCAPTCHA -------------------
    public Map<String, Object> validateCredentialsWithRecaptcha(String username, String password, String recaptchaToken) {
        Map<String, Object> response = new HashMap<>();

        // 1. Verify reCAPTCHA
        if (!recaptchaService.verify(recaptchaToken)) {
            response.put("status", 400);
            response.put("message", "reCAPTCHA verification failed");
            return response;
        }

        // 2. Validate user credentials
        if (UR.validateCredentials(username, password) > 0) {
            String token = JWT.generateToken(username);
            Users user = UR.findByUsername(username);

            response.put("status", 200);
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("username", username);
            response.put("email", user.getEmail());
        } else {
            response.put("status", 401);
            response.put("message", "Invalid Credentials");
        }

        return response;
    }

    // ------------------- Get Full Name -------------------
    public Map<String, Object> getFullname(String token) {
        Map<String, Object> response = new HashMap<>();
        String username = JWT.validateToken(token);
        if (username.equals("401")) {
            response.put("status", 401);
            response.put("message", "Token Expired");
            return response;
        }
        Users u = UR.findByUsername(username);
        response.put("status", 200);
        response.put("fullname", u.getFullname());
        return response;
    }

    // ------------------- Search Users by Email -------------------
    public List<Users> searchUsers(String email) {
        if (email != null && !email.trim().isEmpty()) {
            return UR.findByEmailStartingWithIgnoreCase(email.trim());
        } else {
            return UR.findAll();
        }
    }

    // ------------------- Delete User by Username -------------------
    public Map<String, Object> deleteUserByUsername(String username) {
        Map<String, Object> response = new HashMap<>();
        System.out.println("Deleting user: " + username);

        Users user = UR.findByUsername(username);
        if (user == null) {
            response.put("status", 404);
            response.put("message", "User not found");
            return response;
        }

        try {
            watchlistRepo.deleteAll(watchlistRepo.findByUser(user));
            UR.delete(user);
            response.put("status", 200);
            response.put("message", "User deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            response.put("status", 500);
            response.put("message", "Failed to delete user");
        }

        return response;
    }
}
