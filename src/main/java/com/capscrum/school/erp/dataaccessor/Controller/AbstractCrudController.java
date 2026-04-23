package com.capscrum.school.erp.dataaccessor.Controller;

import com.capscrum.school.erp.dataaccessor.service.CrudService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class AbstractCrudController<DTO, ID> {
    // Define common CRUD operations here, e.g., create, read, update, delete
    // These methods can be abstract or have default implementations
    private final String name;
    private final Logger log;
    protected final CrudService<DTO, ID> crudService;


    protected AbstractCrudController(String name, Logger log, CrudService<DTO, ID> crudService) {
        this.name = name;
        this.log = log;
        this.crudService = crudService;
    }


    @Operation(summary = "Create a new item",
            description = "This replaces the existing item if it already exists"
    )
    @PostMapping
    public ResponseEntity<DTO> create(@RequestBody DTO dto) {
        log.info("Creating new {}: {}", name, dto);
        DTO createdDto = crudService.create(dto);
        return ResponseEntity.ok(createdDto);
    }

    @GetMapping
    public ResponseEntity<List<DTO>> getAll() {
        ResponseEntity<List<DTO>> response = ResponseEntity.ok(crudService.getAll());
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DTO> getById(@PathVariable ID id) {
        DTO found=crudService.getById(id);
        return ResponseEntity.ok(found);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DTO> update(@PathVariable ID id, @RequestBody DTO dto) {
        DTO updated = crudService.updateById(id, dto);
        log.info("Updated {} with id {}: {}", name, id, updated);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable ID id) {
        crudService.deleteById(id);
        log.info("Deleted {} with id {}", name, id);
        return ResponseEntity.ok(name + " deleted successfully");
    }

}
