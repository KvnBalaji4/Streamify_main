package com.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UsersManager {

    @Autowired
    JWTManager JWT;

    @Autowired
    UsersRepository UR;

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

    public Map<String, Object> validateCredentials(String username, String password) {
        Map<String, Object> response = new HashMap<>();
        if (UR.validateCredentials(username, password) > 0) {
            String token = JWT.generateToken(username);
            Users user = UR.findByusername(username);

            response.put("status", 200);
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("username", username);
        } else {
            response.put("status", 401);
            response.put("message", "Invalid Credentials");
        }
        return response;
    }
    
    public Map<String, Object> getFullname(String token) {
        Map<String, Object> response = new HashMap<>();
        String username = JWT.validateToken(token);
        if (username.equals("401")) {
            response.put("status", 401);
            response.put("message", "Token Expired");
            return response;
        }
        Users u = UR.findByusername(username);
        response.put("status", 200);
        response.put("fullname", u.getFullname());
        return response;
    }
    public List<Users> searchUsers(String email) {
        if (email != null && !email.trim().isEmpty()) {
            return UR.findByEmailStartingWithIgnoreCase(email.trim());
        } else {
            return UR.findAll();
        }
    }

    // Delete user by email
    public Map<String, Object> deleteUser(String email) {
        Map<String, Object> response = new HashMap<>();
        Optional<Users> user = UR.findByEmail(email);

        if (user.isEmpty()) {
            response.put("status", 404);
            response.put("message", "User not found");
            return response;
        }

        UR.delete(user.get());
        response.put("status", 200);
        response.put("message", "User deleted successfully");
        return response;
    }

}
