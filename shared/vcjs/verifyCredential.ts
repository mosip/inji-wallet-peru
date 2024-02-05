import vcjs from '@digitalcredentials/vc';
import jsonld from '@digitalcredentials/jsonld';
import {RsaSignature2018} from '../../lib/jsonld-signatures/suites/rsa2018/RsaSignature2018';
import {Ed25519Signature2018} from '../../lib/jsonld-signatures/suites/ed255192018/Ed25519Signature2018';
import {AssertionProofPurpose} from '../../lib/jsonld-signatures/purposes/AssertionProofPurpose';
import {PublicKeyProofPurpose} from '../../lib/jsonld-signatures/purposes/PublicKeyProofPurpose';
import {VerifiableCredential} from '../../types/VC/ExistingMosipVC/vc';
import {Credential} from '../../types/VC/EsignetMosipVC/vc';

// FIXME: Ed25519Signature2018 not fully supported yet.
// Ed25519Signature2018 proof type check is not tested with its real credential
const ProofType = {
  ED25519: 'Ed25519Signature2018',
  RSA: 'RsaSignature2018',
};

const ProofPurpose = {
  Assertion: 'assertionMethod',
  PublicKey: 'publicKey',
};

export async function verifyCredential(
  verifiableCredential: VerifiableCredential | Credential,
): Promise<VerificationResult> {
  try {
    let purpose: PublicKeyProofPurpose | AssertionProofPurpose;
    switch (verifiableCredential.proof.proofPurpose) {
      case ProofPurpose.PublicKey:
        purpose = new PublicKeyProofPurpose();
        break;
      case ProofPurpose.Assertion:
        purpose = new AssertionProofPurpose();
        break;
    }

    let suite: Ed25519Signature2018 | RsaSignature2018;
    const suiteOptions = {
      verificationMethod: verifiableCredential.proof.verificationMethod,
      date: verifiableCredential.proof.created,
    };
    switch (verifiableCredential.proof.type) {
      case ProofType.ED25519: {
        suite = new Ed25519Signature2018(suiteOptions);
        break;
      }
      case ProofType.RSA: {
        suite = new RsaSignature2018(suiteOptions);
        break;
      }
    }

    const vcjsOptions = {
      purpose,
      suite,
      credential: verifiableCredential,
      documentLoader: jsonld.documentLoaders.xhr(),
    };

    const result = await vcjs.verifyCredential(vcjsOptions);
    return handleError(result, false);

    //ToDo Handle Expiration error message
  } catch (error) {
    console.log('Exception during VC Verification->', error);
    return handleError(null, true);
  }
}

function handleError(result: any, isException: boolean) {
  var errorMessage = VerificationErrorType.NO_ERROR;
  var isVerifiedFlag = true;

  var verificationResult: VerificationResult = {
    isVerified: isVerifiedFlag,
    errorMessage: errorMessage,
  };

  if ((result != null && !result.verified) || isException) {
    if (result['results'][0].error.name == 'jsonld.InvalidUrl') {
      errorMessage = VerificationErrorType.NETWORK_ERROR;
    } else {
      errorMessage = VerificationErrorType.TECHNICAL_ERROR;
    }
    isVerifiedFlag = false;
  }
  verificationResult.isVerified = isVerifiedFlag;
  verificationResult.errorMessage = errorMessage;
  return verificationResult;
}

const VerificationErrorType = {
  NO_ERROR: '',
  TECHNICAL_ERROR:
    'Due to <Technical Error>, we were unable to download the card.',
  NETWORK_ERROR:
    'Due to unstable internet connection, we were unable to download the card. Please check your internet connection.',
  EXPIRATION_ERROR:
    'We/’re sorry, the VC cannot be downloaded as it has expired.',
};

export interface VerificationResult {
  errorMessage: string;
  isVerified: boolean;
}
