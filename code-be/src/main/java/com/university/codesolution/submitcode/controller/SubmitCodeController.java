package com.university.codesolution.submitcode.controller;

import com.university.codesolution.submitcode.DTO.ResultDTO;
import com.university.codesolution.submitcode.exception.UnsupportedLanguageException;
import com.university.codesolution.submitcode.parameter.service.ParameterService;
import com.university.codesolution.submitcode.problem.entity.Problem;
import com.university.codesolution.submitcode.strategy.CompilerProcessor;
import com.university.codesolution.submitcode.submission.enums.ELanguage;
import com.university.codesolution.submitcode.request.SubmitCodeRequest;
import com.university.codesolution.submitcode.strategy.CompilerStrategy;
import com.university.codesolution.submitcode.strategy.JavaCompiler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submit-code")
public class SubmitCodeController {
    private static final Logger log = LogManager.getLogger(SubmitCodeController.class);

    @Autowired
    private ParameterService parameterService;

    @PostMapping("/run")
    public ResponseEntity<ResultDTO> submitCode(@RequestBody SubmitCodeRequest request) {
        String code = request.getCode();
        Problem problem = request.getProblem();
        ELanguage eLanguage;

        try{
            eLanguage = ELanguage.valueOf(request.getLanguage().toUpperCase());
        } catch (IllegalArgumentException e){
            throw new UnsupportedLanguageException("Language is not supported yet!");
        }

        CompilerStrategy compilerStrategy = switch (eLanguage) {
            case JAVA -> new JavaCompiler(parameterService);
            case PYTHON, CSHARP ->
                    throw new UnsupportedLanguageException("Language " + eLanguage.name().toLowerCase() + " is not supported yet!");
        };

        CompilerProcessor compilerProcessor = new CompilerProcessor(compilerStrategy);
        ResultDTO resultDTO =  compilerProcessor.run(code,problem);

        return ResponseEntity.ok(resultDTO);
    }
}
