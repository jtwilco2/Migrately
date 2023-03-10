CREATE PROC [dbo].[PageTranslations_InsertV2]
				 @LanguageId int
				,@Link nvarchar(255)
				,@Name nvarchar(100)
				,@CreatedBy int			
				,@Section nvarchar(100)
				,@Component nvarchar(100)
				,@PageSectionId int
				,@KeyName nvarchar(50)
				,@Text nvarchar(4000)
				,@PageSectionKeyId int
				,@Id int OUTPUT
as

/* <--- TEST CODE INSERTBYLANGUAGE --->

DECLARE
		  @Id int = 0

DECLARE
		  @LanguageId int = 200
		 ,@Link nvarchar(255) = 'TestLink2'
		 ,@Name nvarchar(100) = 'TestName1'
		 ,@CreatedBy int = 1		 
		 ,@Section nvarchar(100) = 'Test Section'
		 ,@Component nvarchar(100) = 'TestComp1'
		 ,@PageSectionId int = 10
		 ,@KeyName nvarchar(50) = 'TestKeyName1'
		 ,@Text nvarchar(4000) = 'TestText11'
		 ,@PageSectionKeyId int = 3

EXECUTE dbo.PageTranslations_InsertV2
				 @LanguageId 
				,@Link
				,@Name 
				,@CreatedBy				
				,@Section
				,@Component
				,@PageSectionId
				,@KeyName
				,@Text
				,@PageSectionKeyId
				,@Id OUTPUT

   <--- TEST CODE INSERTBYLANGUAGE ---> */

BEGIN
-----------------------------------------------------------------------------------------------------------
IF NOT EXISTS 
				(
				 SELECT
						 Link
						,LanguageId
				 FROM dbo.PageTranslations
				 WHERE Link = @Link AND LanguageId = @LanguageId
																	)

INSERT INTO dbo.PageTranslations
				(
					 LanguageId
					,Link
					,Name
					,CreatedBy
									)
VALUES
				(	 
					 @LanguageId
					,@Link
					,@Name
					,@CreatedBy
									)

IF EXISTS
				(
				 SELECT Id
				 FROM dbo.PageTranslations
				 WHERE Link = @Link AND LanguageId = @LanguageId
									)

	SET @Id = (
				 SELECT Id
				 FROM dbo.PageTranslations
				 WHERE Link = @Link AND LanguageId = @LanguageId
									)

ELSE
Set @Id = SCOPE_IDENTITY();
DECLARE  @PageTranslationId int = @Id
-----------------------------------------------------------------------------------------------------------
IF NOT EXISTS 
				(
				 SELECT
						 PageTranslationId
				 FROM dbo.PageSection
				 WHERE PageTranslationId = @Id AND Component = @Component OR Section = @Section
																	)
INSERT INTO dbo.PageSection

				(	 
					 PageTranslationId
					,Section
					,Component
									)

VALUES
				(	
					 @PageTranslationId
					,@Section
					,@Component
									)

Set @PageSectionId = SCOPE_IDENTITY();

IF EXISTS
				(
				 SELECT Id
				 FROM dbo.PageSection
				 WHERE Component = @Component AND Section = @Section
																)

	SET @PageSectionId = (
				 SELECT Id
				 FROM dbo.PageSection
				 WHERE Component = @Component AND Section = @Section
																)

-----------------------------------------------------------------------------------------------------------

INSERT INTO dbo.PageSectionKeys
				(
					 PageSectionId
					,KeyName
									)

VALUES
				(
					 @PageSectionId
					,@KeyName
									)

IF EXISTS 
				(
				 SELECT Id
				 FROM dbo.PageSectionKeys
				 WHERE @PageSectionId = Id
									)
SET @PageSectionKeyId = (
				 SELECT Id
				 FROM dbo.PageSectionKeys
				 WHERE @PageSectionId = Id
												)

ELSE
Set @PageSectionKeyId = SCOPE_IDENTITY();

-----------------------------------------------------------------------------------------------------------

INSERT INTO dbo.PageSectionContent
				(
					 PageSectionKeyId
					,Text
					,LanguageId
					,CreatedBy
									)

VALUES
				(	 
					 @PageSectionKeyId
					,@Text
					,@LanguageId
					,@CreatedBy
									)

END
GO
