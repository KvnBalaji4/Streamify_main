package com.demo.watchlist;

import com.demo.Users;
import com.demo.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    List<Watchlist> findByUser(Users user);
    Optional<Watchlist> findByUserAndVideo(Users user, Video video);
    boolean existsByUserAndVideo(Users user, Video video);
}
