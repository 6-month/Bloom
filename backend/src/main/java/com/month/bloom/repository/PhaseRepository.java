package com.month.bloom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.month.bloom.model.Phase;
import com.month.bloom.model.PhaseName;

@Repository
public interface PhaseRepository extends JpaRepository<Phase, Integer>{
    Optional<Phase> findByName(PhaseName phaseName);
}
