package com.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UsersManager UM;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users u) {
        return ResponseEntity.ok(UM.addUser(u));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users u) {
        return ResponseEntity.ok(UM.validateCredentials(u.getUsername(), u.getPassword()));
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

    // ✅ Delete user by username
    @DeleteMapping("/users/deleteByUsername")
    public ResponseEntity<?> deleteUserByUsername(@RequestParam String username) {
        return ResponseEntity.ok(UM.deleteUserByUsername(username));
    }
}
