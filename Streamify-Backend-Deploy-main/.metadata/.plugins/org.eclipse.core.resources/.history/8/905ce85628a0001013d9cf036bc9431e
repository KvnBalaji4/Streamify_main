package com.demo.watchlist;

import com.demo.Users;
import com.demo.UsersRepository;
import com.demo.video.Video;
import com.demo.video.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepo;

    @Autowired
    private UsersRepository userRepo;

    @Autowired
    private VideoRepository videoRepo;

    // ✅ Add to watchlist
    public Map<String, Object> addToWatchlist(String username, Long videoId) {
        Map<String, Object> response = new HashMap<>();

        // use your existing findByusername (non-Optional)
        Users user = userRepo.findByusername(username);
        Video video = videoRepo.findById(videoId).orElse(null);

        if (user == null || video == null) {
            response.put("status", 404);
            response.put("message", "User or video not found");
            return response;
        }

        if (watchlistRepo.existsByUserAndVideo(user, video)) {
            response.put("status", 409);
            response.put("message", "Already in watchlist");
            return response;
        }

        Watchlist wl = new Watchlist();
        wl.setUser(user);
        wl.setVideo(video);
        watchlistRepo.save(wl);

        response.put("status", 200);
        response.put("message", "Added to watchlist");
        return response;
    }

    // ✅ Get watchlist
    public List<Video> getWatchlist(String username) {
        Users user = userRepo.findByusername(username);
        if (user == null) return Collections.emptyList();

        List<Watchlist> items = watchlistRepo.findByUser(user);
        List<Video> videos = new ArrayList<>();
        for (Watchlist wl : items) {
            videos.add(wl.getVideo());
        }
        return videos;
    }

    // ✅ Remove from watchlist
    public Map<String, Object> removeFromWatchlist(String username, Long videoId) {
        Map<String, Object> response = new HashMap<>();

        Users user = userRepo.findByusername(username);
        Video video = videoRepo.findById(videoId).orElse(null);

        if (user == null || video == null) {
            response.put("status", 404);
            response.put("message", "User or video not found");
            return response;
        }

        Optional<Watchlist> wl = watchlistRepo.findByUserAndVideo(user, video);
        if (wl.isEmpty()) {
            response.put("status", 404);
            response.put("message", "Not in watchlist");
            return response;
        }

        watchlistRepo.delete(wl.get());
        response.put("status", 200);
        response.put("message", "Removed from watchlist");
        return response;
    }
}
